import Pizza from '../models/pizzaModel.js';
import {
  createOne,
  deleteOne,
  getAll,
  updateOne,
} from '../utils/handleAPI.js';

export const getAllPizzas = getAll(Pizza);

export const createPizza = createOne(Pizza);

export const updatePizza = updateOne(Pizza);

export const deletePizza = deleteOne(Pizza);
