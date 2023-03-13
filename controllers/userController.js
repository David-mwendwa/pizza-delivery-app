const User = require('../models/userModel');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ success: false, error: 'email already in use!' });
    }
    const user = await User.create({ name, email, password });

    user.save();
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

module.exports = { registerUser };
