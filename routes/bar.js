	'use strict'

var express = require('express');
var BarController = require('../controllers/bar'); /*asi importo el objeto controlador*/

var router = express.Router(); /*asi cargo el servicio de la ruta,que tiene muchos métodos*/

/*esta variable y la otra se necesitan para cargar archivos,despues
hay que crear una carpeta en el proyecto,despues hay que 
incluirlo como parametro en el router.post*/
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./uploads'});


router.get('/home',BarController.home);
router.get('/test',BarController.test);
router.post('/save-bar',BarController.saveBar);
router.get('/get-bars',BarController.getBars);
router.get('/get-bar/:id?',BarController.getBar);
router.post('/upload-image/:id',multipartMiddleware,BarController.uploadImage);
router.get('/get-image/:image',BarController.getImageFile);
router.get('/find-bars/:search?',BarController.findBars);


module.exports = router;

	