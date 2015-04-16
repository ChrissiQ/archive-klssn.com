
/*
 * GET home page.
 */

var mongoose  = require('mongoose')
  , Definition= mongoose.model('Definition')


exports.index = function (req, res) {

  Definition.random(function (err, def) {
    if (err) res.render('Error!' + err)
    res.render('index', { title: 'Chrissi Klassen',
                          def: def,
                          csrf: req.csrfToken() })
  })
}
