import Pizza from '../models/pizzaModel.js';

export const getAllPizzas = async (req, res) => {
  let pizzas = await Pizza.find({});
  res.json({ success: true, pizzas });
};
