import { Request, Response } from 'express';
import { AppDataSource } from '../db/data_source';
import { Student } from '../entities/Student';
import { signToken } from '../utils/jwt.utility';

export const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const studentRepository = AppDataSource.getRepository(Student);
    const student = await studentRepository.findOne({ where: { email }, relations: ['roles', 'roles.permissions'] });

    if (!student || student.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken({ email: student.email });
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure this is correct based on your environment
      sameSite: 'lax', // Adjust based on your needs
      maxAge: 3600000, // 1 hour
    });

    res.json({ message: "Login Successful" });
  },
};
