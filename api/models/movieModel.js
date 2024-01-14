'use strict';

import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Movie Schema
 */
const MovieSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  availableDate: {
    type: Date,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  cast: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  highlighted: {
    type: Boolean
  }
});

const MovieModel = mongoose.model('Movie', MovieSchema);

export default MovieModel;