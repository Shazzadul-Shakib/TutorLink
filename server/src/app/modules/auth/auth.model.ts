import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// ----- hash pasword ----- //
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_round));
  next();
});

// ----- compare password ----- //
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// ----- checking if user exists by email----- //
userSchema.statics.isUserExistsByEmail = async function (email) {
  return await User.findOne({ email });
};

// ----- checking if user exists by Id ----- //
userSchema.statics.isUserExistsById = async function (id) {
  return await User.findById(id);
};

export const User = model<TUser, UserModel>('User', userSchema);
