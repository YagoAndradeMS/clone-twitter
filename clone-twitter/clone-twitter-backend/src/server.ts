import express, { urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { mainRouter } from './routers/main';
import cookieParser from 'cookie-parser';

const server = express();
server.use(helmet());
server.use(
  cors({
    origin:
      // process.env.FRONTEND_URL ||
      'http://localhost:3000',
    credentials: true,
  })
);

server.use(cookieParser()); // <- Adiciona esta linha
server.use(express.json());
server.use(urlencoded({ extended: true }));

// rotas

server.use(mainRouter);

server.listen(process.env.PORT || 3333, () => {
  console.log(`Servidor rodando na porta`, process.env.BASE_URL || '3331');
});
