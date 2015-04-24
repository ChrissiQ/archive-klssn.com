import express from 'express';
import index from './routes/index';
import users from './routes/users';
import login from './routes/login';
import admin from './routes/admin';

let router = express.Router();

router.use('/', index);
router.use('/users', users);
router.use('/login', login);
router.use('/admin', admin);

export default router;