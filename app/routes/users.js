import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

let router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  let User = req.models.user;

  User.cFindAll()
  .then(users => res.send(users))
  .catch(err => console.error(err));
});

router.get('/:name', (req, res, next) => {
  let name = req.params.name;
  let User = req.models.user;
  let Role = req.models.role;

  User.cFindAll({name: name})
  .then(users => res.send(users))
  .catch(err => console.error(err));
});

router.post('/', (req, res, next) => {
  let User = req.models.user;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(req.body.password, salt, (err, hash) => {

      if (err) return next(err);
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }).then(user => res.send(user))
        .catch(err => console.error(err));
    });
  });
});

export default router;