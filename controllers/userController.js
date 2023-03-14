import User from '../models/userModel.js';
import { BadRequestError } from '../errors/index.js';

export const registerUser = async (req, res) => {
  console.log({ user_r: req.body });
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  console.log({ userExists });
  if (userExists) {
    throw new BadRequestError('Email is already taken');
  }
  const user = await User.create({ name, email, password });
  console.log({ user });
  user.save();
  res.json({ success: true, user: req.body });
};
