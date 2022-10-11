var express = require('express');
const users = require('../model/users');
var router = express.Router();

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



router.post('/search', (req, res) => {
  users.find({ username: req.body.search }, (err, doc) => {
    if (err) throw err;
    res.render("gestionUser.twig", { doc })
  });
});

router.get('/supp/:id', (req, res) => {
  var idt = req.params.id;

  users.findOneAndRemove({ _id: idt }, (err) => {

  });
  res.redirect('/users/gestionUser')
});
router.get('/modif/:id', (req, res) => {
  var idt = req.params.id;
  users.find({ _id: idt }, (err, doc) => {
    if (err) throw err;
    res.render("modif.twig", { doc })
  });
});


router.post('/updateAction', (req, res) => {
  var idt = req.body.id;
  users.findById({ _id: idt }, (err, data) => {

    data.username = req.body.username,
      data.email = req.body.email,


      data.save();
  });
  res.redirect('/users/gestionUser')
});
module.exports = router;