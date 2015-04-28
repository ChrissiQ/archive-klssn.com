import express from 'express';
import passport from 'passport';

let router = express.Router();

router.get('/', function (req, res, next) {

  let user = req.user;
  let isAuthenticated = req.isAuthenticated;

  if (!user || !isAuthenticated || !user.IsAdmin())
    return res.status(401).end();

  return res.render('admin', {name: user.name});
});

export default router;