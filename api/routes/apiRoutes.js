import { loginRequired, register, sign_in } from '../controllers/userController.js';
import { getMovies, getMovieById } from '../controllers/movieController.js';
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

  // Genre routes
  app.route('/films/genres')
    .get(loginRequired, getGenres);
}
