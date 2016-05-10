define([
  'jquery',
  'underscore',
  'backbone',
  'service',
  'servicelist',
  'serviceview',
  'text!templates/addserviceTemplate.html',
  'dispatcher'
], function($,_, Backbone,Service,ServiceList,ServiceView,addserviceTemplate,dispatcher) {
// The main view of the application
	var AddServiceView = Backbone.View.extend({

		// Base the view on an existing element
		//el: $('#addForm'),
		el: $('#Wcontainer'),
		template: addserviceTemplate,

		initialize: function(){
			//this.render();
			//var uploadfiles = document.querySelector('#fileinput');
			// uploadfiles.addEventListener('change', function () {

   //  			var files = this.files;

			//     for(var i=0; i<files.length; i++){

			//         previewImage(this.files[i]);
			//     }

			// }, false);

		},

		render: function(){

			var tmpl = _.template(this.template); //tmpl is a function that takes a JSON object and returns html
        	this.$el.html(tmpl(/*this.model.toJSON()*/));
        	
            return this;

		},

		events: { 
			'click #addService': "addService",
			'change #coverImage': "processUpload"
		},
		
        processUpload: function(e){
            
            var fileInput = $("#coverImage");
            
            console.log("fileinput:",fileInput[0]);
            this.showPreview(fileInput[0].files);  
            var file = fileInput[0].files[0];
            console.log("file:",file);
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#fileData').val(reader.result);
                $('#fileName').val(file.name);
            };
            reader.readAsDataURL(file);
            
        },

        showPreview: function(files){
        	console.log("showPreview for:" + files.length);


		    for(var i=0; i<files.length; i++){
		    	console.log("calling previewImage")
		        this.previewImage(files[i]);
		    }
        },
        previewImage: function(file){
        	 
		    var galleryId = "gallery";

		    var gallery = $("#gallery");//document.getElementById(galleryId);
		    var imageType = /image.*/;

		    if (!file.type.match(imageType)) {

		        throw "File Type must be an image";

		    }
		    
		    var thumb = document.createElement("div");
		    var thumb = $("<div></div>");
		    thumb.addClass('thumbnail'); // Add the class thumbnail to the created div
		    var img = document.createElement("img");
		    img.file = file;
		    //thumb.appendChild(img);
		    thumb.append(img);
		    //gallery.appendChild(thumb);
		    gallery.append(thumb);
		    // Using FileReader to display the image content
		    var reader = new FileReader();
		    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
		    reader.readAsDataURL(file);
			

        },
		addService: function(event){
			var s = new Service({ title: $("#sname").val(), price: $("#sprice").val(), newFilename: $("#fileName").val(), newFile: $("#fileData").val()});
			//var s = { title: $("#sname").val(), price: $("#sprice").val()};
			dispatcher.trigger("add",s);
			$("#sname").val("");
			$("#sprice").val("");
		}

	});
	return AddServiceView;

});