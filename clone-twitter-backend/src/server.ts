import express, { urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { mainRouter } from './routers/main';

const server = express();
server.use(helmet());
server.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

server.use(urlencoded({ extended: true }));
server.use(express.json());

// rotas

server.use(mainRouter);

server.listen(process.env.BASE_URL || 3333, () => {
  console.log(`Servidor rodando na porta`, process.env.BASE_URL || '3333');
});
