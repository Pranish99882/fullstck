import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AppDataSource } from './datasource';
import { User } from './entity/User';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:3001', // Replace with the URL of your frontend app
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }));

app.use(bodyParser.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        // Implement your login logic (e.g., find user, check password)
        try {
          const user = await userRepository.findOne({ where: { email } });
          if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }
      
          // Generate and send JWT or session token
          const token = jwt.sign({ email: user.email }, 'PRNS', { expiresIn: '1h' });
          res.setHeader('Authorization', `Bearer ${token}`);
          // res.json({ token });
        } catch (error) {
          res.status(500).json({ message: 'Internal server error' });
        }
      });
    
    app.post('/api/register', async (req, res) => {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      try {
        const userRepository = AppDataSource.getRepository(User);

        // Check if the user already exists
        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email is already in use' });
        }

        // Create a new user
        const newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password; // Note: Hash passwords in production!

        await userRepository.save(newUser);

        res.status(201).json({ message: 'Registration successful' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log('Error: ', error));
