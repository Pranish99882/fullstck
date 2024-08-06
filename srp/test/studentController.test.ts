import { Request, Response } from 'express';
import { studentController } from '../src/controllers/studentController';
import { AppDataSource } from '../src/db/data_source';
import { Student } from '../src/entities/Student';
import { Role } from '../src/entities/Role';
import { Permission } from '../src/entities/Permission';

// Mock the database connection
jest.mock('../src/db/data_source', () => ({
  AppDataSource: {
    getRepository: jest.fn(() => ({
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
    })),
    initialize: jest.fn().mockResolvedValue(true),
    destroy: jest.fn().mockResolvedValue(true),
  },
}));

describe('studentController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockStudent: Partial<Student>;
  let mockRole: Partial<Role>;
  let mockPermission: Partial<Permission>;

  beforeAll(async () => {
    await AppDataSource.initialize(); // Initialize database connection
  });

  afterAll(async () => {
    await AppDataSource.destroy(); // Close database connection
  });

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockStudent = { id: 1, email: 'test@example.com', password: 'password', roles: [] };
    mockRole = { id: 1, name: 'testRole', permissions: [] };
    mockPermission = { id: 1, name: 'testPermission' };

    (AppDataSource.getRepository as jest.Mock).mockReturnValue({
      findOne: jest.fn().mockResolvedValue(mockRole),
      create: jest.fn().mockReturnValue(mockStudent),
      save: jest.fn().mockResolvedValue(mockStudent),
      find: jest.fn().mockResolvedValue([mockStudent]),
      remove: jest.fn().mockResolvedValue({}),
    });
  });

  it('should create a student and return 201 status', async () => {
    req.body = {
      email: 'test@example.com',
      password: 'password',
      roleNames: ['testRole'],
      permissionNames: ['testPermission'],
    };

    await studentController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockStudent);
  });

  it('should return all students', async () => {
    await studentController.getAll(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith([mockStudent]);
  });

  it('should update a student', async () => {
    req.params = { id: '1' };
    req.body = { email: 'updated@example.com' };
    const updatedStudent = { ...mockStudent, email: 'updated@example.com' };
    (AppDataSource.getRepository as jest.Mock).mockReturnValueOnce({
      findOne: jest.fn().mockResolvedValue(mockStudent),
      merge: jest.fn().mockReturnValue(updatedStudent),
      save: jest.fn().mockResolvedValue(updatedStudent),
    });

    await studentController.update(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(updatedStudent);
  });

  it('should delete a student', async () => {
    req.params = { id: '1' };

    await studentController.delete(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith({ message: 'Student deleted' });
  });

//   it('should handle error when creating a student', async () => {
//     (AppDataSource.getRepository as jest.Mock).mockReturnValueOnce({
//       findOne: jest.fn().mockRejectedValue(new Error('Error')),
//     });

//     await studentController.create(req as Request, res as Response);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
//   });
});
