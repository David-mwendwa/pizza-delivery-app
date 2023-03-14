import express from 'express';
import { placeOrder } from '../controllers/orderController.js';
const router = express.Router();

router.route('/placeorder').post(placeOrder);

export default router;
