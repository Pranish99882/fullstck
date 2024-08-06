// // // src/middlewares/authMiddleware.ts
// // import { Request, Response, NextFunction } from 'express';
// // import { verifyToken } from '../utils/jwt.utility';
// // import { Student } from '../entities/Student';
// // import { AppDataSource } from '../db/data_source';
// // import { JwtPayload } from 'jsonwebtoken';


// // export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
// //   const authorizationHeader = req.headers['authorization'];
  
// //   if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
// //     return res.status(401).json({ message: 'Unauthorized' });
// //   }

// //   const token = authorizationHeader.split('Bearer ')[1];
  
// //   try {
    
// //     const decoded = verifyToken(token) as JwtPayload;

// //     const studentRepository = AppDataSource.getRepository(Student);
// //     const student = await studentRepository.findOne({ where: { email: decoded.email }, relations: ['roles', 'roles.permissions'] });

// //     if (!student) {
// //       return res.status(401).json({ message: 'Unauthorized' });
// //     }

// //     (req as any).user = student;

// //     next();
// //   } catch (error) {
// //     return res.status(401).json({ message: 'Unauthorized' });
// //   }
// // };

// import { Request, Response, NextFunction } from 'express';
// import { verifyToken } from '../utils/jwt.utility';
// import { Student } from '../entities/Student';
// import { AppDataSource } from '../db/data_source';
// import { JwtPayload } from 'jsonwebtoken';

// export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   const token = req.cookies.authToken;
//   console.log(token);

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized no token' });
//   }

//   try {
//     const decoded = verifyToken(token) as JwtPayload;

//     const studentRepository = AppDataSource.getRepository(Student);
//     const student = await studentRepository.findOne({ where: { email: decoded.email }, relations: ['roles', 'roles.permissions'] });

//     if (!student) {
//       return res.status(401).json({ message: 'Unauthorized no student' });
//     }

//     // Attach the authenticated student to the request object
//     (req as any).user = student;

//     next();
//   } catch (error) {
//     console.error('Error in authMiddleware:', error);
//     return res.status(401).json({ message: 'Unauthorized here' });
//   }
// };


import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utility';
import { Student } from '../entities/Student';
import { AppDataSource } from '../db/data_source';
import { JwtPayload } from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // Extract token from cookies
  const token = req.cookies.authToken;
  console.log('Token:', token); // For debugging purposes

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  try {
    // Verify the token
    const decoded = verifyToken(token) as JwtPayload;
    console.log('Decoded Token:', decoded); // For debugging purposes

    // Find the student by email from the decoded token
    const studentRepository = AppDataSource.getRepository(Student);
    const student = await studentRepository.findOne({ 
      where: { email: decoded.email }, 
      relations: ['roles', 'roles.permissions'] 
    });

    if (!student) {
      return res.status(401).json({ message: 'Unauthorized: Student not found' });
    }

    // Attach the authenticated student to the request object
    (req as any).user = student;

    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
