import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';

export const appRoutes = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => appRoutes.use(route.path, route.route));
