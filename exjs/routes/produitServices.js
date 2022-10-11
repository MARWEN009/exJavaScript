var express = require('express');
const produits = require('../model/produits');

var router = express.Router();

router.get('', function (req, res, next) {
    produits.find((err,dox)=>{
    if ()
    });
    res.render('viewProduit.twig',{doc});
});

module.exports = router;