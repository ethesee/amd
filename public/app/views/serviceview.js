define([
  'jquery',
  'underscore',
  'backbone',
], function($,_, Backbone) {
// This view turns a Service model into HTML
	var ServiceView = Backbone.View.extend({
		tagName: 'li',

		events:{
			'click': 'toggleService'
		},

		initialize: function(){
			this.listenTo(this.model, 'change', this.render);
		},

		render: function(){

			// Create the HTML
            var html = '<input type="checkbox" value="1" name="' + this.model.get('title') + '" /> ' + this.model.get('title') + '<span>$' + this.model.get('price') + '</span>';
            var modelImage = this.model.get('image');
            if ( modelImage !== ''){
            	html += '<span><img src="uploads\\' + modelImage + '" width=150 height=150></span>';
            }
			this.$el.html(html);
			this.$('input').prop('checked', this.model.get('checked'));
            
			return this;
		},

		toggleService: function(){
			
			this.model.toggle();
		}
	});
	return ServiceView;
});
