var express = require('express');
const { findByIdAndDelete } = require('../model/produits');
const produits = require('../model/produits');

var router = express.Router();

router.get('', function (req, res, next) {
    produits.find((err, doc) => {
        if (err) throw err;
        res.render('viewProduit.twig', { doc });
    });

});
router.get('/ajouterProduit', (req, res) => {
    res.render("ajouterProduit.twig");
});

router.post('/addAction', (req, res) => {
    var p = new produits(req.body)
    p.save();
    res.redirect('/produit');
});

router.get('/supp/:id', (req, res) => {
    var idt = req.params.id;
    produits.findByIdAndRemove({ _id: idt }, (err) => {
        if (err) throw err;

    });
    res.redirect('/produit');

});

router.get('/modif/:id', (req, res) => {
    var idt = req.params.id;
    produits.find({ _id: idt }, (err, doc) => {
        if (err) throw err;
        res.render("modifier.twig", { doc });
    });
});

router.post('/actionModif', (req, res) => {
    var idt = req.body.id;
    produits.findById({ _id: idt }, (err, data) => {
        if (err) throw err;
        data.lib = req.body.lib;
        data.prix = req.body.prix;
        data.marq = req.body.marq;
        data.save();
    });
    res.redirect('/produit');
});

router.get('/search', (req, res) => {
    produits.find({ marq: req.body.search }, (err, doc) => {
        if (err) throw err;
        res.render("viewProduit.twig", { doc });
    });
});

module.exports = router;