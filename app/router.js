import express from 'express';
import index from './routes/index';
import users from './routes/users';
import login from './routes/login';

let router = express.Router();

router.use('/', index);
router.use('/users', users);
router.use('/login', login);

export default router;