import express from 'express';
import { getAllPizzas } from '../controllers/pizzaController.js';

const router = express.Router();

router.route('/').get(getAllPizzas);

export default router;
