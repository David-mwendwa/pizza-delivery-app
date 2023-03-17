import express from 'express';
import { createPizza, getAllPizzas } from '../controllers/pizzaController.js';

const router = express.Router();

router.route('/').get(getAllPizzas);
router.route('/pizza/new').get(createPizza);

export default router;
