import { signupSchema } from './schemas/signup';
import {
  createUser,
  findUserByEmail,
  findUserBySlug,
} from '../services/user.service';
import slug from 'slug';
import { RequestHandler } from 'express';
import { hash } from 'bcrypt-ts';
import { createJWT } from '../utils/jwt';

export const signup: RequestHandler = async (req, res) => {
  // Validar os dados recebidos
  const safeData = signupSchema.safeParse(req.body);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  // Verificar email
  const hasEmail = await findUserByEmail(safeData.data.email);

  if (hasEmail) {
    res.json({ error: 'E-mail já existe' });
    return;
  }

  // Verificar Slug
  let genSlug = true;
  let userSlug = slug(safeData.data.name);

  while (genSlug) {
    const hasSlug = await findUserBySlug(userSlug);

    if (hasSlug) {
      let slugSuffix = Math.floor(Math.random() * 9999999).toString();
      userSlug += slugSuffix;
    } else {
      genSlug = false;
    }
  }

  // Gerar hash de senha
  const hashPassword = await hash(safeData.data.password, 10);

  // Criar o usuário
  const newUser = await createUser({
    slug: userSlug,
    name: safeData.data.name,
    email: safeData.data.email,
    password: hashPassword,
  });

  // Criar o token
  const token = createJWT(userSlug);

  // Retornar o resultado (token, user)
  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      slug: newUser.slug,
      avatar: newUser.avatar,
    },
  });
};
