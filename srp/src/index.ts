import express from 'express';
import { AppDataSource } from './db/data_source';
import { authController } from './controllers/authController';
import { studentController } from './controllers/studentController';
import { authMiddleware } from './middlewares/authMiddleware';
import { permissionMiddleware } from './middlewares/permissionMiddleware';
export const app=express();
import cors from 'cors';
import cookieParser from 'cookie-parser';

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001', // Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable cookies and other credentials
}));

app.use(cookieParser());

  app.post('/login', authController.login);

  // 
  // authMiddleware, permissionMiddleware(['read']),
  // authMiddleware, permissionMiddleware(['update']),
  // authMiddleware, permissionMiddleware(['delete']),

  app.post('/students', authMiddleware, permissionMiddleware(['create']), studentController.create);
  app.get('/students',  authMiddleware, permissionMiddleware(['read']),studentController.getAll);
  app.get('/students/:id',  studentController.getOne);
  app.put('/students/:id', studentController.update);
  app.delete('/students/:id', studentController.delete);



  // app.listen(3000, () => {
  //   console.log('Server started on port 3000');
  // });

  if (require.main === module) {
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }