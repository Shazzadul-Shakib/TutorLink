import { ErrorRequestHandler } from 'express';
import { TError } from '../interface/error';
import config from '../config';
import AppError from '../errorHandlers/AppError';
import { ZodError } from 'zod';
import { handleZodError } from '../errorHandlers/handleZodError';
import { handleValidationError } from '../errorHandlers/handleValidationError';
import { handleDuplicateError } from '../errorHandlers/handleDuplicateError';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = err.message || 'Something went wrong!';
  let error: TError = [{ path: '', message }];

  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    error = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};
