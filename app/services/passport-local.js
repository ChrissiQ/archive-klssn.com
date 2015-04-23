import passport from 'passport';
import passportLocal from 'passport-local';
import debug from 'debug';
import bcrypt from 'bcrypt';

let config = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
};

let verify = (req, email, password, done) => {
  let Users = req.models.user;

  Users.one({'email': email}, (err, user) => {

    if (err)
      return done(err);

    if (!user)
      return done(null, false);

    bcrypt.compare(password, user.password, (err, res) => {

      if (err)
        return done(err);

      if (!res)
        return done(null, false);

      return done(null, user);
    });

  });
}

let localStrategy = new passportLocal.Strategy(config, verify);

export default localStrategy;