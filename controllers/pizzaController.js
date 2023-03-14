const Pizza = require('../models/pizzaModel');

const getAllPizzas = async (req, res) => {
  try {
    let pizzas = await Pizza.find({});
    res.json({ success: true, pizzas });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllPizzas };
