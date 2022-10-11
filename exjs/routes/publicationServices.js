var express = require('express');
const publication = require('../model/publications');
const { route } = require('./produitServices');
var router = express.Router();

router.get('/', (req, res) => {
    publication.find((err, doc) => {
        if (err) throw err;
        res.render("viewPublication.twig", { doc });
    });

});

router.post('/ajouterPub', (req, res) => {
    var p = new publication(req.body);
    p.save();
    res.redirect('/publication');
});

router.get('/supp/:id', (req, res) => {
    var idt = req.params.id;
    publication.findByIdAndDelete({ _id: idt }, (err) => {
        if (err) throw err;
    });
    res.redirect('/publication');
});
router.get('/update/:id', (req, res) => {
    var idt = req.params.id
    publication.find({ _id: idt }, (err, doc) => {
        if (err) throw err;
        res.render('updatePublication.twig', { doc });
    });
});
router.post('/updateAction', (req, res) => {
    var idt = req.body.id;
    publication.findById({ _id: idt }, (err, data) => {
        if (err) throw err;
        data.titre = req.body.titre;
        data.description = req.body.description;
        data.data = req.body.data;
        data.save();
    });
    res.redirect('/publication');
});

router.get('/search', (req, res) => {
    publication.find({titre: req.body.cle}, (err, doc) => {
        if (err) throw err;
        res.render("viewPublication.twig", { doc });
    });
});
module.exports = router;