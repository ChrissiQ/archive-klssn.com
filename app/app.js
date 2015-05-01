import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import validator from 'express-validator';
import flash from 'connect-flash';

import router from './router';
import sequelizeService from './services/express-sequelize';
import sessionService from './services/express-session';
import localStrategy from './services/passport-local';

let appGenerator = (connection, models) => {

  let app = express();

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(validator());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(flash());
  app.use(sequelizeService(connection, models));
  app.use(sessionService);
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    let User = models.user;
    User.cFindOne({id: id})
      .then(user => done(null, user))
      .catch(err => done(err, null));
  });
  passport.use(localStrategy);

  app.use(router);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  return app;
};

export default appGenerator;