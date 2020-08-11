'use strict'

var mongoose = require('mongoose');/*require es una funcion de Node*/
var app = require('./app'); 
var port = 3700;


//Conexion a la base de datos
/*27017 es el puerto por defecto de Mongo*/
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/barwelt')
.then(()=>{
		console.log("database conexion was succesfully stablished...");

			//creacion del servidor
			app.listen(port,()=>{
				console.log('server running correctly in the url:localhost:3700');
			});	

})
.catch(err => console.log(err));
