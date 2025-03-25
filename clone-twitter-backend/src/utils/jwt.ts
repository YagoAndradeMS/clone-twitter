import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findUserBySlug } from '../services/user.service';
import { ExtendedRequest } from '../../types/extended-request';

export const createJWT = (slug: string) => {
  return jwt.sign({ slug }, process.env.JWT_SECRET as string);
};

export const verifyJWT = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(401).json({ error: 'Acesso negado' });
    return;
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (error, decoded: any) => {
      if (error) {
        return res.status(401).json({ error: 'Acesso negado' });
      }

      const user = await findUserBySlug(decoded.slug);
      if (!user) {
        // Ajuste: antes estava verificando se o usuário existia incorretamente
        return res.status(401).json({ error: 'Acesso negado' });
      }

      req.userSlug = user.slug;
      next(); // Chama next() apenas se tudo estiver correto
    }
  );
};
