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
        	this.$el.html(tmpl(/*this.model.toJSON()*/)); //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            return this;

		},

		events: { 
			'click #addService': "addService"
		},

		addService: function(event){
			var s = new Service({ title: $("#sname").val(), price: $("#sprice").val()});
			dispatcher.trigger("add",s);
			$("#sname").val("");
			$("#sprice").val("");
		}

	});
	return AddServiceView;

});