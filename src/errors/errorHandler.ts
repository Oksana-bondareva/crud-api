import { Request, Response } from 'express';

const errorHandler = (error: Error, request: Request, response: Response) => {
  console.error(error.stack);
  response.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;