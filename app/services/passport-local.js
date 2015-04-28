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

  Users.find({where: {email: email}, include: [{ all: true }]}).then((user) => {

    if (!user)
      return done(null, false);

    bcrypt.compare(password, user.password, (err, res) => {

      if (err)
        return done(err);

      if (!res)
        return done(null, false);

      return done(null, user);
    });

  })
  .catch(err => done(err));
}

let localStrategy = new passportLocal.Strategy(config, verify);

export default localStrategy;