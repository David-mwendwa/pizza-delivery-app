const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();

const pizzasRouter = require('./routes/pizzasRoute');
const userRouter = require('./routes/userRoutes');

app.get('/', (req, res) => {
  res.json({ success: true, page: 'Homepage' });
});

app.use('/api/pizzas', pizzasRouter);
app.use('/api/user', userRouter);

app.use('*', (req, res) => {
  res.send('Route does not exist');
});

// mongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to mongoDB'))
  .catch((err) => console.log(`Could not connect to the database`, err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
