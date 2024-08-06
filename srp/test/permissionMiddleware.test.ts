import { Request, Response, NextFunction } from 'express';
import { permissionMiddleware } from '../src/middlewares/permissionMiddleware';

// Mock user with roles and permissions
const mockUser = {
  roles: [
    {
      permissions: [
        { name: 'create' },
        { name: 'read' },
      ],
    },
    {
      permissions: [
        { name: 'update_student' },
      ],
    },
  ],
};

// TypeScript type for the mock request
interface MockRequest extends Request {
  user?: {
    roles: {
      permissions: {
        name: string;
      }[];
    }[];
  };
}

describe('permissionMiddleware', () => {
  let req: Partial<MockRequest>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      user: mockUser,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should call next if user has required permissions', () => {
    const middleware = permissionMiddleware(['create', 'read']);
    (middleware as any)(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should return 403 if user does not have required permissions', () => {
    const middleware = permissionMiddleware(['delete']);
    (middleware as any)(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden not permitted' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if user is not authenticated', () => {
    req.user = undefined;
    const middleware = permissionMiddleware(['create']);
    (middleware as any)(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });
});
