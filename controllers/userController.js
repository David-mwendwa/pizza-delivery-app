import User from '../models/userModel.js';
import { BadRequestError } from '../errors/index.js';

export const registerUser = async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestError('Email is already taken');
  }
  const user = await User.create({ name, email, password, passwordConfirm });
  user.save();
  res.json({ success: true, user });
};
