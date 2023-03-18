import Pizza from '../models/pizzaModel.js';
import {
  createOne,
  deleteOne,
  getMany,
  getOne,
  updateOne,
} from '../utils/handleAPI.js';

export const getAllPizzas = getMany(Pizza);

export const getPizzaDetails = getOne(Pizza);

export const createPizza = createOne(Pizza);

export const updatePizza = updateOne(Pizza);

export const deletePizza = deleteOne(Pizza);
