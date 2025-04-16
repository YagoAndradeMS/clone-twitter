import { signupSchema } from '../schemas/signup';
import {
  createUser,
  findUserByEmail,
  findUserBySlug,
} from '../services/user.service';
import slug from 'slug';
import { RequestHandler } from 'express';
import { compare, hash } from 'bcrypt-ts';
import { createJWT } from '../utils/jwt';
import { signinSchema } from '../schemas/signin';

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
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
  });

  res.status(201).json({
    user: {
      name: newUser.name,
      slug: newUser.slug,
      avatar: newUser.avatar,
    },
  });
};

export const signin: RequestHandler = async (req, res) => {
  // Validar os dados recebidos
  const safeData = signinSchema.safeParse(req.body);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const user = await findUserByEmail(safeData.data.email);

  if (!user) {
    res.status(401).json({ error: 'Acesso negado' });
    return;
  }

  const verifyPass = await compare(safeData.data.password, user.password);

  if (!verifyPass) {
    res.status(401).json({ error: 'Acesso negado' });
    return;
  }

  const token = createJWT(user.slug);

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
  });

  res.status(201).json({
    user: {
      name: user.name,
      slug: user.slug,
      avatar: user.avatar,
    },
  });
};
