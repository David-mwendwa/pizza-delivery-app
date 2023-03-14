const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
      trim: true,
    },
    variants: [
      {
        type: String,
      },
    ],
    prices: {
      type: String,
      required: [true, 'Please enter a price'],
    },
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

module.exports = mongoose.model('Pizza', pizzaSchema);
