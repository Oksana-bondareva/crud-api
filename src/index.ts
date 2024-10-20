import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/routes';
import notFoundHandler from './errors/notFoundHandler';
import errorHandler from './errors/errorHandler';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/users', userRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;