import express from 'express';
import { getMyOrders, placeOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.route('/placeorder').post(placeOrder);
router.route('/me').get(protect, getMyOrders);

export default router;
