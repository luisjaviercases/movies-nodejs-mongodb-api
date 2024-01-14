import { register, sign_in } from '../controllers/userController.js';

export default function (app) {
  app.route('/auth/register')
    .post(register);

  app.route('/auth/sign_in')
    .post(sign_in);
}
