import express from 'express';
import {
  createPizza,
  deletePizza,
  getAllPizzas,
  updatePizza,
} from '../controllers/pizzaController.js';

const router = express.Router();

router.route('/').get(getAllPizzas);
router.route('/pizza/new').get(createPizza);
router.route('/pizza/:id').put(updatePizza).delete(deletePizza);

export default router;
