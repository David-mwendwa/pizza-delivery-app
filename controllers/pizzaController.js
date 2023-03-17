import Pizza from '../models/pizzaModel.js';
import { createOne } from '../utils/handleFactory.js';

export const getAllPizzas = async (req, res) => {
  let pizzas = await Pizza.find({});
  res.json({ success: true, data: { pizzas } });
};

export const createPizza = createOne(Pizza);
