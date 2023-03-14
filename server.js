require('express-async-errors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const pizzasRouter = require('./routes/pizzasRoute');
const userRouter = require('./routes/userRoutes');

app.get('/', (req, res) => {
  res.json({ success: true, page: 'Homepage' });
});

app.use('/api/pizzas', pizzasRouter);
app.use('/api/user', userRouter);

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
