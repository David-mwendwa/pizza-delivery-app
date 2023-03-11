const mongoose = require('mongoose');
const express = require('express');
const Pizza = require('./models/pizzaModel');
const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
  res.json({ success: true, page: 'Homepage' });
});

app.get('/pizzas', async (req, res) => {
  try {
    let pizzas = await Pizza.find({});
    res.json({ success: true, pizzas });
  } catch (error) {
    console.log(error);
  }
});

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
