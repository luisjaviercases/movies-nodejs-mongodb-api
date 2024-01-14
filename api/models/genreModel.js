'use strict';

import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Genre Schema
 */
const GenreSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const GenreModel = mongoose.model('Genre', GenreSchema);

export default GenreModel;