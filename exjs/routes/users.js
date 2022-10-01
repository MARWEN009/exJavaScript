var express = require('express');
const users = require('../model/users');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('auth.twig');
});

router.post('/auth', function (req, res, next) {

  users.find({ login: req.body.username, password: req.body.mp }, (err, data) => {

    if (err) throw err;

    if (data.length != 0)
      res.render("auth.twig");
    else

      res.redirect('/users/gestionUser')
  });

});

router.get('/gestionUser', (req, res) => {
  users.find((err, doc) => {
    if (err) throw err;
    res.render("gestionUser.twig", { doc })
  });
});

router.post('/addAction', (req, res) => {

  var u = new users(req.body);
  u.save();
  res.redirect('/users/gestionUser')
});

router.get('/recherch', function (req, res, next) {
  res.render('recherch.twig');
});



router.post('/search', (req, res)=>{
  users.find({email : req.body.search
  }, (err, doc)=>{
  if(err) throw err;
  res.render("show.twig", {doc})
  });
  });

module.exports = router;
