var mongoose = require('mongoose');
var schema = mongoose.Schema;

var publication = new schema({
    titre : String,
    description : String,
    date : Date
});
module.exports = mongoose.model('publications',publication);
