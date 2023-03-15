import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      minlength: 3,
      maxlength: [30, 'Your name cannot exceed 30 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [6, 'Your password must be longer than 6 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      trim: true,
      validate: {
        // This only works on .create() or .save()
        validator: function (val) {
          return this.password === val;
        },
        message: "Passwords don't match",
      },
    },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

// encrypt password
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
});

// compare password
userSchema.methods.comparePassword = async function (enteredPassword, userPwd) {
  return await bcrypt.compare(enteredPassword, userPwd || this.password);
};

// sign token
userSchema.methods.signToken = function () {
  return jwt.sign(
    { userId: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

export default mongoose.model('Users', userSchema);
