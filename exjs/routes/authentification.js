var express = require('express');
const users = require('../model/users');
var router = express.Router();

/* GET users listing. */
router.get('', function (req, res, next) {
    res.render('authentification.twig');
});

router.post('/verifier', function (req, res, next) {

    users.find({ login: req.body.username, password: req.body.mp }, (err, data) => {

        if (err) throw err;

        if (data.length != 0)
            res.redirect('/users/gestionUser')
        else
            res.redirect('/authentification')
    });

});
module.exports = router;