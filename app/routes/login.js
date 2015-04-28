import express from 'express';
import passport from 'passport';

let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (res.err) res.render('Error!' + res.err)
  // req.login(user, function(err) {
  //   if (err) { return next(err); }
  //   return res.redirect('/users/' + req.user.name);
  // });
  res.render('login', { title: 'Chrissi Klassen', flash: req.flash() })
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {

    if (err)
      return next(err);

    if (!user) {
      req.session.messages = info.message;
    }

    req.logIn(user, err => {
      if (err) {
        req.session.messages = "Error";
        return next(err);
      }

      req.session.messages = "Login successful.";
      res.redirect('/users/' + req.user.name);
    });
  })(req, res, next);
});

export default router;