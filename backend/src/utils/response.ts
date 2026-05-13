import { Response } from 'express';
import { ApiResponse } from '../types';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    statusCode,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  error: string,
  message: string = 'Error',
  statusCode: number = 400
): Response => {
  const response: ApiResponse<null> = {
    success: false,
    statusCode,
    message,
    error,
  };
  return res.status(statusCode).json(response);
};
