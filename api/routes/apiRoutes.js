import { loginRequired, register, sign_in } from '../controllers/userController.js';
import { getMovies, getMovieById, getFavoriteMovies, addFavoriteMovie, removeFavoriteMovie } from '../controllers/movieController.js';
import { getGenres } from '../controllers/genreController.js';

export default function (app) {
  // User routes
  app.route('/auth/register')
    .post(register);
  app.route('/auth/sign_in')
    .post(sign_in);

  // Movies routes
  app.route('/films/movies')
  .get(loginRequired, getMovies);
  app.route('/films/movies/:id')
    .get(loginRequired, getMovieById);
  app.route('/films/user')
    .get(loginRequired, getFavoriteMovies);
  app.route('/films/user/list')
    .post(loginRequired, addFavoriteMovie);
  app.route('/films/user/list/:id')
    .delete(loginRequired, removeFavoriteMovie);

  // Genre routes
  app.route('/films/genres')
    .get(loginRequired, getGenres);
}
