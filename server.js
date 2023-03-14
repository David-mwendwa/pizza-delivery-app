// require('express-async-errors');
// const mongoose = require('mongoose');
// const express = require('express');
// const app = express();
// require('dotenv').config();
import 'express-async-errors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
const app = express();
dotenv.config();

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

import pizzasRouter from './routes/pizzasRoute.js';
import userRouter from './routes/userRoutes.js';

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, page: 'Homepage' });
});

app.use('/api/v1/pizzas', pizzasRouter);
app.use('/api/v1/users', userRouter);

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
