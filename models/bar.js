'use strict'

var mongoose = require('mongoose'); /*mongoose deal with the models*/
var Schema = mongoose.Schema;/*define the model schema*/

var BarSchema = Schema({
	name:String,
	city:String,
	address:String,
	type:String,
	music:String,
	remarks:String,
	image:String,
});

module.exports = mongoose.model('Bar',BarSchema);
