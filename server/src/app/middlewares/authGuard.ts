import { NextFunction, Request, Response } from 'express';
import { CatchAsync } from '../utils/catchAsync';
import AppError from '../errorHandlers/AppError';
import httpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/auth/auth.interface';
import { User } from '../modules/auth/auth.model';

export const authGuard = (...requiredRole: TUserRole[]) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access!');
    }

    // ----- extract the token from Bearer ----- //
    const token = authHeader.split(' ')[1];

    // ----- if token is not sent ----- //
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access!');
    }

    // ----- Verify the JWT token ----- //
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        config.access_token_secret as string,
      ) as JwtPayload;
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token!');
    }

    const { email, role } = decoded;

    // ----- check existance of user ----- //
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // ----- check if user is blocked ----- //
    if (user.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
    }

    // ----- Check if role is authorized ----- //
    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
