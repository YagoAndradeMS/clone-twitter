import { Router } from 'express';
import * as pingController from '../controllers/ping.controller';
import * as authController from '../controllers/auth.controller';
import { verifyJWT } from '../utils/jwt';

export const mainRouter = Router();

// Rotas de teste
mainRouter.get('/ping', pingController.ping);
mainRouter.get('/private-ping', verifyJWT, pingController.privatePing);

// Rotas para login e registro
mainRouter.post('/auth/signup', authController.signup);
mainRouter.post('/auth/signin', authController.signin);

// Rotas para tweets
// mainRouter.post('/tweet');
// mainRouter.get('/tweet/:id'); // tweet/123
// mainRouter.get('/tweet/:id/answers');
// mainRouter.post('/tweet/:id/like');

// Rotas para os usuarios
// mainRouter.get('/user/:slug');
// mainRouter.get('/user/:slug/tweets');
// mainRouter.post('/user/:slug/follow');
// mainRouter.put('/user');
// mainRouter.put('/user/avatar');
// mainRouter.put('/user/cover');

// Rotas do sistema
// mainRouter.get('/feed');
// mainRouter.get('/search');
// mainRouter.get('/trending');
// mainRouter.get('/suggestions');
