import index from './app/controllers/index';
import user from './app/controllers/user';
import login from './routes/login';

export default function router (app) {
  app.use('/', index);
  app.use('/users', user);
  app.use('/login', login);
}