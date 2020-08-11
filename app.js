'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar archivos de rutas
var bar_routes = require('./routes/bar');

//middlewares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//CORS

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas
app.use('/api',bar_routes);

/*esta rutas valen como prueba 
app.get('/',(req,res)=>{
	res.status(200).send("<h1>Pagina de inicio de la ruta '/'</h1>");
});
	
app.post('/datos/:id',(req,res)=>{

	console.log(req.body.nombre);
	console.log(req.query.web);
	console.log(req.params.id);


	  res.status(200).send('Mensaje de la ruta /datos');
});
*/




module.exports = app;

