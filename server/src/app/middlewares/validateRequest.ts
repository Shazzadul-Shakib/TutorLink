import { AnyZodObject } from 'zod';
import { CatchAsync } from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';

export const validateRequest = (
  schema: AnyZodObject | { body?: AnyZodObject; cookies?: AnyZodObject },
) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    for (const [key, value] of Object.entries(schema)) {
      if (value) {
        // Dynamically validate parts of the request
        await value.parseAsync(req[key as keyof Request]);
      }
    }
    next();
  });
};
