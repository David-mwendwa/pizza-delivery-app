import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import { BadRequestError } from '../errors/index.js';
const stripe = new Stripe(
  'sk_test_51Imu8iKOyrEmScQW3cepN6ppj7EXKrrhf3VTtEkBihn9Kt2o8S5PH4Or5w7VARuWOmF6HTsbU8LrbiT2g6oGFnid00mvREAaRm'
);

export const placeOrder = async (req, res) => {
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
  res.json({ success: true, message: 'Payment successful' });
};
