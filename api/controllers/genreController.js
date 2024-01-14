'use strict';

import mongoose from 'mongoose';

const Genre = mongoose.model('Genre');

export const getGenres = async function(_req, res) {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getGenres;
