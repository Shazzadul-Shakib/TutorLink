import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  salt_round: process.env.SALT_ROUND,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
  refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
};
