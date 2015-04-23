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

router.post('/',
  passport.authenticate('local'),
  (req, res, next) => res.redirect('/users/' + req.user.name));

export default router;