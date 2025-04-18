import { z } from 'zod';

export const signinSchema = z.object({
  email: z.string({ message: 'Email é obrigatória' }).email('E-mail inválido'),
  password: z
    .string({ message: 'Senha é obrigatória' })
    .min(4, 'Precisa ter 4 ou mais caracteres'),
});
