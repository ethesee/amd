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
                
            var file = fileInput[0].files[0];
            console.log("file:",file);
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#fileData').val(reader.result);
                $('#fileName').val(file.name);
            };
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