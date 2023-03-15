import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true },
    // user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: [],
    shippingAddress: { type: Object },
    orderAmount: { type: Number, required: true },
    orderStatus: {
      type: String,
      required: true,
      default: 'processing',
    },
    transactionId: { type: String, required: true },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
