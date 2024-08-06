// src/utils/jwt.utility.ts
import jwt from 'jsonwebtoken';

const secretKey = 'PRNS';

export const signToken = (payload: object) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secretKey);
};
