const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, company } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    let userData = { name, email, password: hashedPassword, role };
    if (role === 'employer' && company && company !== '') {
      // If company is not a valid ObjectId, create a new Company
      const mongoose = require('mongoose');
      if (!mongoose.Types.ObjectId.isValid(company)) {
        const Company = require('../models/Company');
        let existingCompany = await Company.findOne({ name: company });
        if (!existingCompany) {
          existingCompany = new Company({ name: company });
          await existingCompany.save();
        }
        userData.company = existingCompany._id;
      } else {
        userData.company = company;
      }
    }
    const user = new User(userData);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
