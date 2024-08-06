import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../src/middlewares/authMiddleware';
import { verifyToken } from '../src/utils/jwt.utility';
import { AppDataSource } from '../src/db/data_source';
import { Student } from '../src/entities/Student';

// Mocking dependencies
jest.mock('../src/utils/jwt.utility', () => ({
  verifyToken: jest.fn(),
}));

jest.mock('../src/db/data_source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('authMiddleware', () => {
  let studentRepository: any;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    studentRepository = {
      findOne: jest.fn(),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(studentRepository);
  });

  it('should return 401 if no authorization header is present', async () => {
    // Test with headers being an empty object
    await authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  it('should return 401 if authorization header does not start with Bearer', async () => {
    req.headers = { authorization: 'Basic token' };

    await authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  it('should return 401 if token is invalid', async () => {
    req.headers = { authorization: 'Bearer invalid_token' };
    (verifyToken as jest.Mock).mockImplementation(() => { throw new Error('Invalid token'); });

    await authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  it('should return 401 if student is not found', async () => {
    req.headers = { authorization: 'Bearer valid_token' };
    (verifyToken as jest.Mock).mockReturnValue({ email: 'student@example.com' });
    studentRepository.findOne.mockResolvedValue(null);

    await authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  it('should call next if student is found and token is valid', async () => {
    req.headers = { authorization: 'Bearer valid_token' };
    (verifyToken as jest.Mock).mockReturnValue({ email: 'student@example.com' });
    studentRepository.findOne.mockResolvedValue({ email: 'student@example.com' });

    await authMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect((req as any).user).toEqual({ email: 'student@example.com' });
  });
});
