import 'express-async-errors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
const app = express();
dotenv.config();

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

import pizzasRouter from './routes/pizzasRoute.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/ordersRoutes.js';
import adminRouter from './routes/adminRoutes.js';

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/pizzas', pizzasRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', orderRouter);
app.use('/api/v1/admin', adminRouter);

// use error middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// mongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to mongoDB'))
  .catch((err) => console.log(`Could not connect to the database`, err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
