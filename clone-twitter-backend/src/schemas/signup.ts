import { z } from 'zod';

export const signupSchema = z.object({
  name: z
    .string({ message: 'Nome é obrigatória' })
    .min(2, 'Precisa ter 2 ou mais caracteres'),
  email: z.string({ message: 'Email é obrigatória' }).email('E-mail inválido'),
  password: z
    .string({ message: 'Senha é obrigatória' })
    .min(4, 'Precisa ter 4 ou mais caracteres'),
});
