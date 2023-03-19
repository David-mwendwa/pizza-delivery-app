import express from 'express';
import {
  deleteOrder,
  getMyOrders,
  getOrders,
  getSingleOrder,
  placeOrder,
  updateOrder,
} from '../controllers/orderController.js';
import { authorizePermissions, protect } from '../middleware/auth.js';
const router = express.Router();

router.route('/order/placeorder').post(placeOrder);
router.route('/orders/me').get(protect, getMyOrders);
router.route('/orders/:id').get(protect, getSingleOrder);

router
  .route('/admin/orders')
  .get(protect, authorizePermissions(true), getOrders);

router
  .route('/admin/orders/:id')
  .patch(protect, authorizePermissions(true), updateOrder)
  .delete(protect, authorizePermissions(true), deleteOrder);

export default router;
