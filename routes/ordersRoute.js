import express from 'express';
import {
  getMyOrders,
  getSingleOrder,
  placeOrder,
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.route('/placeorder').post(placeOrder);
router.route('/me').get(protect, getMyOrders);
router.route('/:id').get(protect, getSingleOrder);

export default router;
