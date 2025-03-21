import { Model, Types } from 'mongoose';
import { USER_ROLE } from './auth.constant';

export interface TUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isUserExistsByEmail(email: string): Promise<TUser>;
  isUserExistsById(id: string): Promise<TUser>;
}

export type TLogin = {
  email: string;
  password: string;
};

export type TUserRole = keyof typeof USER_ROLE;
