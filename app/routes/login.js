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
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      req.flash('errors', { msg: info.message });
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
});

router.get('/failed', (req, res, next) => {
  // console.log(next);
  res.send('Failed to authenticate');
});
 
router.get('/success', (req, res, next) => {
  // res.send(req.message);
  res.send('Successfully authenticated');
});

export default router;