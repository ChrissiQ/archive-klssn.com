import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportLocal from 'passport-local';
import session from 'express-session';
import redis from 'connect-redis';
import orm from 'orm';
import bcrypt from 'bcryptjs';

import router from './router';
import {development as config} from './config';
import { userModel } from './app/models/user';
import { userModelOptions } from './app/models/user';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Custom middleware
 */

app.use(orm.express(config.database, {
  define: (db, models, next) => {
    models.user = db.define("user", userModel, userModelOptions);
    next();
  }
}));
 
let RedisStore = redis(session);

app.use(session({
  store: new RedisStore(config.redis),
  secret: config.session_secret,
  resave: true,
  saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

let LocalStrategy = passportLocal.Strategy;
passport.use(new LocalStrategy(
  {passReqToCallback: true},

  (req, name, password, done) => {
    req.models.user.find(

      {'name': name},
      1,
      (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (user.password != password) return done(null, false);
        return done(null, user);
      }
    );
  }
));

router(app);

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


module.exports = app;
