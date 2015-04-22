import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

let router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  let User = req.models.user;
  User.find({}, (err, results) => {
    res.send(results);
  });
});

router.post('/', (req, res, next) => {
  let User = req.models.user;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(req.body.password, salt, (err, hash) => {

      if (err) return next(err);
      // res.send("ok");
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }, (err, results) => {
      if (err) return next(err);
        res.send(results);
      });

      // next();

    });
  });
});

export default router;