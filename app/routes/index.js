import express from 'express';

let router = express.Router();

router.get('/', (req, res, next) => {
    if (res.err) res.render('Error!' + res.err)
    res.render('index', { title: 'Chrissi Klassen'})
});

export default router;