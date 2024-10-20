import { Request, Response } from 'express';

const notFoundHandler = (request: Request, response: Response) => {
    response.status(404).json({ message: 'Endpoint not found' });
};

export default notFoundHandler;
