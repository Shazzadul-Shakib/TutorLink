import { Router } from 'express';
import { userControllers } from './auth.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  refreshTokenValidationSchema,
  userLoginValidationSchema,
  userValidationSchema,
} from './auth.validation';

export const authRoutes = Router();

authRoutes.post(
  '/register',
  validateRequest({ body: userValidationSchema }),
  userControllers.registerUser,
);
authRoutes.post(
  '/login',
  validateRequest({ body: userLoginValidationSchema }),
  userControllers.loginUser,
);
authRoutes.post(
  '/refresh-token',
  validateRequest({ cookies: refreshTokenValidationSchema }),
  userControllers.refreshToken,
);
