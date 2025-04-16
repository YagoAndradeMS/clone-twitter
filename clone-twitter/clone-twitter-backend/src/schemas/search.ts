import { z } from 'zod';

export const searchSchema = z.object({
  q: z.string({ message: 'preencha a busca' }).min(3, 'Minimo de 3 caracteres'),
  page: z.coerce.number().min(0).optional(),
});
