'use strict';

import mongoose from 'mongoose';

const Movie = mongoose.model('Movie');
const User = mongoose.model('User');

// Method to get the updated list of favorite movies
const getUpdatedFavoriteMovies = async (userId) => {
  const updatedUser = await User.findById(userId).populate('favoriteMovies').exec();
  return updatedUser.favoriteMovies;
};

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

export const getFavoriteMovies = async function(req, res, next) {
  try {
    const user = req.authenticatedUser; // Gets the user stored in req

    // Return only favorite movie IDs
    const favoriteMovieIds = user.favoriteMovies;

    res.json(favoriteMovieIds);
  } catch (err) {
    next(err);
  }
};

export const addFavoriteMovie = async function(req, res, next) {
  try {
    const user = req.authenticatedUser; // Gets the user stored in req

    const movieId = req.body.id; // Assuming the movie ID is sent in the request body

    // Check if the movie is already in the list
    if (user.favoriteMovies.includes(movieId)) {
      return res.status(400).json({ message: 'The movie is already on the favorites list' });
    }

    // Add the movie to your favorites list
    user.favoriteMovies.push(movieId);
    await user.save();

    const updatedFavoriteMovies = await getUpdatedFavoriteMovies(user._id);

    res.json({ message: 'Movie added to favorites list successfully', myList: updatedFavoriteMovies });
  } catch (err) {
    next(err);
  }
};

export const removeFavoriteMovie = async function(req, res, next) {
  try {
    const user = req.authenticatedUser; // Gets the user stored in req
    const movieId = req.params.id; // Get movie ID from URL parameters

    // Filter favorites list to remove movie
    user.favoriteMovies = user.favoriteMovies.filter(id => id !== movieId);
    await user.save();

    const updatedFavoriteMovies = await getUpdatedFavoriteMovies(user._id);

    res.json({ message: 'Movie removed from favorites list successfully', myList: updatedFavoriteMovies });
  } catch (err) {
    next(err);
  }
};
