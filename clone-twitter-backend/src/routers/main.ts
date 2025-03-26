import { Router } from 'express';
import * as pingController from '../controllers/ping.controller';
import * as authController from '../controllers/auth.controller';
import * as tweetController from '../controllers/tweet.controller';
import * as userController from '../controllers/user.controller';
import * as feedController from '../controllers/feed.controller';
import * as searchController from '../controllers/search.controller';
import { verifyJWT } from '../utils/jwt';

export const mainRouter = Router();

// Rotas de teste
mainRouter.get('/ping', pingController.ping);
mainRouter.get('/private-ping', verifyJWT, pingController.privatePing);

// Rotas para login e registro
mainRouter.post('/auth/signup', authController.signup);
mainRouter.post('/auth/signin', authController.signin);

// Rotas para tweets
mainRouter.post('/tweet', verifyJWT, tweetController.addTweet);
mainRouter.get('/tweet/:id', verifyJWT, tweetController.getTweet); // tweet/123
mainRouter.get('/tweet/:id/answers', verifyJWT, tweetController.getAnsers);
mainRouter.post('/tweet/:id/like', verifyJWT, tweetController.likeToggle);

// Rotas para os usuarios
mainRouter.get('/user/:slug', verifyJWT, userController.getUser);
mainRouter.get('/user/:slug/tweets', verifyJWT, userController.getUserTweets);
mainRouter.post('/user/:slug/follow', verifyJWT, userController.followToogle);
mainRouter.put('/user', verifyJWT, userController.updateUser);
// mainRouter.put('/user/avatar');
// mainRouter.put('/user/cover');

// Rotas do sistema
mainRouter.get('/feed', verifyJWT, feedController.getFeed);
mainRouter.get('/search', verifyJWT, searchController.searchTweets);
// mainRouter.get('/trending');
// mainRouter.get('/suggestions');
