import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true },
    orderItems: [],
    shippingAddress: { type: Object },
    orderAmount: { type: Number, required: true },
    isDelivered: { type: Boolean, required: true },
    transactionId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
