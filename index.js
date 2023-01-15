'use strict'

var mongoose = require('mongoose');/*require es una funcion de Node*/
var app = require('./app'); 
var port = 3700;


//conexion with the db
/*27017 is the Mongo default port*/
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/barwelt')
.then(()=>{
	console.log("database conexion was succesfully stablished...");
	//server creation
	app.listen(port,()=>{
		console.log('server running correctly in the url:localhost:3700');
	});	

})
.catch(err => console.log(err));
