'use strict'

var mongoose = require('mongoose'); /*mongoose se encarga de trabajar con los modelos*/
var Schema = mongoose.Schema;/*definimos el esquema de un modelo*/

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