var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (res.err) res.render('Error!' + res.err)
    res.render('index', { title: 'Chrissi Klassen'})
});

export default router;