	'use strict'

var express = require('express');
var BarController = require('../controllers/bar'); /*import the controler object*/

var router = express.Router(); /*load the route service,wich contains lost of methods*/

/*this variable and the other,are needed to load the files.After we create a folder in the project,after we include as parameter in router.post*/
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

	
