'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

/**
 * User Schema
 */
const UserSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  hash_password: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  favoriteMovies: {
    type: [String],
    default: []
  }
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.hash_password);
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
