import index from './app/controllers/index';
import user from './app/controllers/user';

export default function router (app) {
  app.use('/', index);
  app.use('/users', user);
}