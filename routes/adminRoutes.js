import express from 'express';
import { createPizza } from '../controllers/pizzaController.js';

const router = express.Router();

router.route('/pizza/new').post(createPizza);

export default router;
