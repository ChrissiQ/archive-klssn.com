import passport from 'passport';
import passportLocal from 'passport-local';

let config = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
};

let verify = (req, email, password, done) => {
  console.log(`Verifying email is ${email} and password is ${password}`);
  let Users = req.models.user;

  Users.find({'email': email}, 1, (err, user) => {

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