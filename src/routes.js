import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';

import {
  storeUserValidator,
  updateUserValidator,
  storeSessionValidator,
} from './app/middlewares/validators';

const routes = new Router();

routes.post('/session', storeSessionValidator, SessionController.store);
routes.post('/users', storeUserValidator, UserController.store);

routes.use(authMiddleware);
routes.put('/users', updateUserValidator, UserController.update);

export default routes;
