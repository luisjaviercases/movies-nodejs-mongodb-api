'use strict';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const User = mongoose.model('User');

function generateUniqueId() {
  const timestamp = new Date().getTime().toString(36);
  const randomString = Math.random().toString(36).substring(2, 8);
  return timestamp + randomString;
}

export const register = async function(req, res) {
  try {
    const newUser = new User(req.body);
    newUser._id = generateUniqueId();
    newUser.hash_password = await bcrypt.hash(req.body.password, 10);
    const user = await newUser.save();

    user.hash_password = undefined;
    return res.json(user);
  } catch (err) {
    return res.status(400).send({
      message: err.message
    });
  }
};

export const sign_in = function(req, res) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      }
      const token = jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs');
      return res.json({ token });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error.' });
    });
};
