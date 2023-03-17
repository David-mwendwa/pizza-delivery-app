import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import { BadRequestError, NotFoundError } from '../errors/index.js';
const stripe = new Stripe(
  'sk_test_51Imu8iKOyrEmScQW3cepN6ppj7EXKrrhf3VTtEkBihn9Kt2o8S5PH4Or5w7VARuWOmF6HTsbU8LrbiT2g6oGFnid00mvREAaRm'
);
import Order from '../models/orderModel.js';
import { getOne } from '../utils/handleFactory.js';

export const placeOrder = async (req, res) => {
  // when using authentication, currentUser isn't really needed - you can access the user from the req
  const { token, subtotal, currentUser, cartItems } = req.body;

  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });

  const payment = await stripe.charges.create(
    {
      customer: customer.id,
      amount: subtotal,
      currency: 'usd',
      receipt_email: token.email,
    },
    { idempotencyKey: uuidv4() }
  );

  if (!payment) {
    throw new BadRequestError('Payment failed!');
  }

  const order = new Order({
    name: currentUser.name,
    email: currentUser.email,
    userId: currentUser._id,
    // user: req.user._id,
    orderItems: cartItems,
    orderAmount: subtotal,
    shippingAddress: {
      street: token.card.address_line1,
      city: token.card.address_city,
      country: token.card.address_country,
      pincode: token.card.address_zip,
    },
    transactionId: payment.source.id,
    paidAt: Date.now(),
  });
  order.save();

  res.json({ success: true, message: 'Payment successful' });
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.userId }).sort({
    _id: -1,
  });
  if (!orders) {
    throw new NotFoundError('No orders available');
  }
  res.json({ success: true, data: { orders } });
};

export const getSingleOrder = getOne(Order);
