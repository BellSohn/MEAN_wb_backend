'use strict'	

var Bar = require('../models/bar');
var fs = require('fs');
var path = require('path');

var controller = {

	home:function(req,res){

		return res.status(200).send({
			message:'I am the home'
		});
	},

	test:function(req,res){
		return res.status(200).send({
			message:'estas probando un test'
		});
	},


	saveBar:function(req,res){

			var bar = new Bar();
			var params = req.body;

			 bar.name = params.name;
			 bar.city = params.city;
			 bar.address = params.address;
			 bar.type = params.type;
			 bar.music = params.music;
			 bar.remarks = params.remarks;
			 bar.image = null;


		bar.save((err,barStored)=>{
			if(err) return res.status(500).send({message:'error storing bar'});
			if(!barStored) return res.status(404).send({message:'document can´t be stored'});

			return res.status(200).send({bar:barStored});	

		});	


	},

	

	

	getBars:function(req,res){

		Bar.find({}).exec((err,bars)=>{
			if(err) return res.status(500).send({message:'error returning data'});

			if(!bars) return res.status(404).send({message:'there is no information to show'});

			return res.status(200).send({bars});
		});

	},

	getBar:function(req,res){

			var barId = req.params.id;

			if(barId == null) return res.status(404).send({message:'the bar doesn´t exists'});

			Bar.findById(barId,(err,bar) => {
				if(err) return res.status(500).send({message:'Error while returning data'});
				if(!bar) return res.status(404).send({message:'The bar doesn´t exists'});

				return res.status(200).send({
					bar
				});
			});

	},

	findBars:function(req,res){
		
		var searchString = req.params.search;
		
		Bar.find({ "$or" : [
			{ "name":{"$regex":searchString,"$options":"i"}},
			{ "city":{"$regex":searchString,"$options":"i"}},
			{ "address":{"$regex":searchString,"$options":"i"}},
			{ "type":{"$regex":searchString,"$options":"i"}},
			{ "music":{"$regex":searchString,"$options":"i"}}

			]}).exec((err,bars)=>{

					if(err){
						return res.status(500).send({
							message:'error en la peticion',
						})
					}

					if(!bars || bars.length <=0 ){
						return res.status(404).send({
							message:'no hay resultados'
						});
					}

					return res.status(200).send({
						bars
					});			
				})
		},
		

		

	


	uploadImage:function(req,res){
		/*recogemos el id del bar sobre la que se va a guardar la imagen*/
		var barId = req.params.id;
		var fileName = "Image not uploaded";

		if(req.files){
			
			/*console.log(req.files);
			return res.status(200).send({files:req.files});*/

			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'jpg' || fileExt == 'png' || fileExt == 'jpeg' || fileExt == 'gif'){

				Bar.findByIdAndUpdate(barId,{image:fileName},{new:true},(err,barUpdated)=>{

			if(err) return res.status(200).send({message:'The image was not uploded'});
			if(!barUpdated) return res.status(404).send({message:'the image doesn´t exists'});

				return res.status(200).send({bar:barUpdated});

				});

			}else{
					fs.unlink(filePath,err =>{
						return res.status(200).send({message:'imagen extension is not valid'});
					});	
			}

		}else{
			return res.status(200).send({message:fileName});
		}
	},


		getImageFile:function(req,res){

			var file = req.params.image;
			var path_file ='./uploads/'+file;

			fs.exists(path_file,(exists)=>{
				if(exists){
					return res.sendFile(path.resolve(path_file));

				}else{
					return res.status(200).send({message:'the image doesn´t exists'});
				}
			});
		}



};

module.exports = controller;