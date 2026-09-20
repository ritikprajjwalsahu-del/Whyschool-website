import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'whyschool_super_secret_jwt_key_2026_x9812';

export interface AuthRequest extends Request {
  admin?: {
    id: string;
    email: string;
    role: string;
  };
}

export function authenticateAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  const token =
    req.cookies?.admin_token ||
    (req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized access. No auth token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
}
