import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
      trim: true,
    },
    varients: [
      {
        type: String,
      },
    ],
    prices: [],
    category: {
      type: String,
      required: [true, 'Please select a category'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide product image'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter  product description'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Pizza', pizzaSchema);
