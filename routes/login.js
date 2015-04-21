import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';

let router = express.Router();
let LocalStrategy = passportLocal.Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  if (res.err) res.render('Error!' + res.err)
  // req.login(user, function(err) {
  //   if (err) { return next(err); }
  //   return res.redirect('/users/' + req.user.name);
  // });
  res.render('login', { title: 'Chrissi Klassen'})
});

router.post('/',
  passport.authenticate('local', {
    successRedirect: '/login/success',
    failureRedirect: '/login/failed'
  })
);

router.get('/failed', function(req, res, next) {
  res.send('Failed to authenticate');
});
 
router.get('/success', function(req, res, next) {
  res.send('Successfully authenticated');
});

export default router;