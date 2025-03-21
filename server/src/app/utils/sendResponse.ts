import { Response } from 'express';
import { TResponse } from '../interface/response';

export const SendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    statusCode: data?.statusCode,
    data: data?.data,
  });
};
