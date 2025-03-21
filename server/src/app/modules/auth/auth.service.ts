import AppError from '../../errorHandlers/AppError';
import { TLogin, TUser } from './auth.interface';
import { User } from './auth.model';
import httpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { createToken } from './auth.utils';

// ----- register user ----- //
const registerUserService = async (payload: TUser) => {
  const result = await User.create(payload);
  return {
    _id: result._id,
    name: result.name,
    email: result.email,
  };
};

// ----- login user ----- //
const loginUserService = async (payload: TLogin) => {
  // ----- checking if user exist ----- //
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid credentials');
  }

  // ----- checking if user is blocked ----- //
  if (user.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  // ----- checking if password is matched ----- //
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // ----- create access token ----- //
  const jwtPayload = {
    _id: user?._id,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.access_expire_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_token_secret as string,
    config.refresh_expire_in as string,
  );

  return { accessToken, refreshToken };
};

// ----- refresh token ----- //
const refreshToken = async (token: string) => {
  // ----- Verify the JWT token ----- //
  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(
      token,
      config.refresh_token_secret as string,
    ) as JwtPayload;
  } catch {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token!');
  }

  const { email } = decoded;

  // ----- check existance of user ----- //
  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // ----- check if user is blocked ----- //
  if (user.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  // ----- create access token ----- //
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.access_expire_in as string,
  );

  return {
    accessToken,
  };
};

// ----- export auth services ----- //
export const userServices = {
  registerUserService,
  loginUserService,
  refreshToken,
};
