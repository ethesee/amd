define([
  'jquery',
  'underscore',
  'backbone',
  'dispatcher',
  'text!templates/serviceTemplate.html'
], function($,_, Backbone, dispatcher,serviceTemplate) {
// This view turns a Service model into HTML
	var ServiceView = Backbone.View.extend({
		//tagName: 'li',
		tagName: 'div',
		template: serviceTemplate,
		events:{
			'click [type="checkbox"]': 'toggleService'
		},

		initialize: function(){
			this.listenTo(this.model, 'change', this.render);
			dispatcher.on('showim', this.toggleDiv, this);
		},

		render: function(){
            var tmpl = _.template(this.template);
            if ( this.model.get('id')){
            	this.$el.html(tmpl(this.model.toJSON()));
            	this.$('input').prop('checked', this.model.get('checked'));
            }
            
            
            
			return this;
		},

		toggleService: function(e){	
			this.model.toggle();			
		}
	});
	return ServiceView;
});
