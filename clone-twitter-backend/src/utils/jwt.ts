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
  const token = req.cookies.token; // Pega o token diretamente dos cookies

  if (!token) {
    res.status(401).json({ error: 'Acesso negado' });
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({ error: 'Acesso negado' });
      }

      const user = await findUserBySlug(decoded.slug);
      if (!user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }

      req.userSlug = user.slug;
      next(); // Chama next() apenas se tudo estiver correto
    }
  );
};
