import { RequestHandler } from 'express';

export const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API not found!',
    error: '',
  });
};
