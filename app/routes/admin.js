import express from 'express';
import passport from 'passport';

let router = express.Router();

router.get('/', (req, res, next) => {
  let Role = req.models.role;
  let user = req.user;
  // Role.create({
  //   name: 'admin'

  // }).then(role => {
  //   req.user.setRoles([role]);
    res.send(user);

  // }).catch(err => console.error(err));




  // passport.authenticate('local', (err, user) => {
  //   if (err)
  //     return next(err);

  //   if (!user) {
  //     return res.status(401).end();

  //     // if (user.role === 'premium'){
  //     //   //return res.render('admin', {name: req.user.name});
  //     // }else{
  //       // return res.send(403,{
  //       //   'status': 403,
  //       //   'code': 1, // custom code that makes sense for your application
  //       //   'message': 'You are not a premium user',
  //       //   'moreInfo': 'https://myawesomeapi.io/upgrade'
  //       // });
  //   }
  //   return res.send(user);
  //   // return res.send(401,{
  //   //   'status': 401,
  //   //   'code': 2, // custom code that makes sense for your application
  //   //   'message': 'You are not authenticated.',
  //   //   'moreInfo': 'https://myawesomeapi.io/docs'
  //   // });
  // })(req, res, next);
})

export default router;