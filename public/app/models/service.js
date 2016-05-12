define([
  'underscore',
  'backbone',
], function(_, Backbone) {
	var Service = Backbone.Model.extend({

			// Will contain three attributes.
			// These are their default values

			defaults:{
				title: 'My service',
				price: 100,
				checked: false,
				image: ''	
			},
			idAttribute: "_id",
			parse:function (response) {
		        //console.log(response);
		        response.id = response._id;
		        if ( response.image !== 'undefined'){
		        	console.log("image:" + response.image);
		        }else{
		        	console.log("no image");
		        }
		        return response;
		    },
			// Helper function for checking/unchecking a service
			toggle: function(){
				this.set('checked', !this.get('checked'));
			}
	});
	return Service;
});