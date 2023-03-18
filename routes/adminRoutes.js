import express from 'express';
import {
  createPizza,
  updatePizza,
  deletePizza,
  getPizzaDetails,
} from '../controllers/pizzaController.js';

const router = express.Router();

router.route('/pizza/new').post(createPizza);
router
  .route('/pizza/:id')
  .get(getPizzaDetails)
  .patch(updatePizza)
  .delete(deletePizza);

export default router;
