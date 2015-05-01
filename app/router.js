import express from 'express';
import index from './routes/index';
import users from './routes/users';
import login from './routes/login';
import admin from './routes/admin';
import posts from './routes/posts';

let router = express.Router();

router.use('/', index);
router.use('/users', users);
router.use('/login', login);
router.use('/admin', admin);
router.use('/posts', posts);

export default router;