'use strict';

import mongoose from 'mongoose';

const Movie = mongoose.model('Movie');

export const getMovies = async function(_req, res) {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieById = async function(req, res, next) {
  try {
    const movieId = req.params.id; // Get movie ID from URL parameters

    // Validate if movie exists
    const movie = await Movie.findById(movieId).exec();

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (err) {
    next(err);
  }
};
