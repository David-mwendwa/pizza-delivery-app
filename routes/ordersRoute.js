import express from 'express';
import { getMyOrders, placeOrder } from '../controllers/orderController.js';
const router = express.Router();

router.route('/placeorder').post(placeOrder);
router.route('/me').get(getMyOrders);

export default router;
