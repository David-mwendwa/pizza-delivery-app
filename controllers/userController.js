import User from '../models/userModel.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

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

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthenticatedError('Incorrect email or password');
  }
  const isPasswordCorrect = await user.comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Incorrect email or password');
  }
  user.password = undefined;
  res.json({ success: true, message: 'login successful', user });
};
