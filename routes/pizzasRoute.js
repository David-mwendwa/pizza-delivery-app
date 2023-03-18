import express from 'express';
import {
  getAllPizzas,
  getPizzaDetails,
} from '../controllers/pizzaController.js';

const router = express.Router();

router.route('/').get(getAllPizzas);
router.route('/:id').get(getPizzaDetails)
export default router;
