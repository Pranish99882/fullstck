import request from 'supertest';
import { app } from '../src/index';
import { AppDataSource } from '../src/db/data_source';
import { Student } from '../src/entities/Student';

jest.mock('../src/db/data_source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('authController', () => {
  let studentRepository: any;

  beforeEach(() => {
    studentRepository = {
      findOne: jest.fn(),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(studentRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if email is not found', async () => {
    studentRepository.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post('/login')
      .send({ email: 'notfound@example.com', password: 'password123' });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: 'Invalid email or password' });
  });

  it('should return 401 if password is incorrect', async () => {
    studentRepository.findOne.mockResolvedValue({
      email: 'student@example.com',
      password: 'correct_password',
    });

    const res = await request(app)
      .post('/login')
      .send({ email: 'student@example.com', password: 'wrong_password' });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: 'Invalid email or password' });
  });

  it('should return a token if credentials are correct', async () => {
    const student = {
      email: 'student@example.com',
      password: 'correct_password',
      
    };
    studentRepository.findOne.mockResolvedValue(student);

    const res = await request(app)
      .post('/login')
      .send({ email: 'student@example.com', password: 'correct_password' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.token).toBeTruthy();
  });
});
