import Pizza from '../models/pizzaModel.js';
import { createOne, getAll } from '../utils/handleFactory.js';

export const getAllPizzas = getAll(Pizza)

export const createPizza = createOne(Pizza);
