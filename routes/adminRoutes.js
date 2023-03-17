import express from 'express';
import {
  createPizza,
  updatePizza,
  deletePizza,
} from '../controllers/pizzaController.js';

const router = express.Router();

router.route('/pizza/new').post(createPizza);
router.route('/pizza/:id').put(updatePizza).delete(deletePizza);

export default router;
