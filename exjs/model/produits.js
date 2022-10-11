var mongoose = require('mongoose');   
var shema = mongoose.Schema;

var produit = new shema({
    lib: String,
    prix: Number,
    marq: String
});

module.exports = mongoose.model('produits', produit);
