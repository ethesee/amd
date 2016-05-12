define([
  'jquery',
  'underscore',
  'backbone',
  'service',
  'servicelist',
  'serviceview',
  'dispatcher',
  'utils',
  'text!templates/chooserTemplate.html',
], function($,_, Backbone,Service,ServiceList,ServiceView,dispatcher,Utils,chooserTemplate) {
// The main view of the application
	var ChooserView = Backbone.View.extend({

		// Base the view on an existing element
		el: $('#Wcontainer'),
		//template: chooserTemplate,

		initialize: function(options){
			
			this.services = options.collection;
			
			
			this.services.on("reset", this.render, this);
	        this.render();
	 
	        //this.services.on("add", this.renderBook, this);
	        /*this.services.on("remove", this.removeBook, this);
	        */
			// Cache these selectors
			
		
			this.listenTo(this.services, 'change', this.render);
			dispatcher.on('add', this.addService, this);

			
			
		},

		createServiceViews: function(){
			this.list.empty();
			this.total = $('#total span');
			
			// Create views for every one of the services in the
			// collection and add them to the page
			
			this.services.each(function(service){

				var view = new ServiceView({ model: service });
				this.list.append(view.render().el);

			}, this);	// "this" is the context in the callback
		},

		render: function(){
			this.template = _.template(chooserTemplate);
			this.$el.html(this.template());
			this.list = $('#services');
			this.createServiceViews();
			// Calculate the total order amount by agregating
			// the prices of only the checked elements
			
			var total = 0;

			_.each(this.services.getChecked(), function(elem){
				var price = parseFloat(elem.get('price'));
				total += ( typeof price !== 'undefined') ? price : 0;
			});
			//total = total.toFixed(2);
			total = Utils.roundToTwo(total);
			// Update the total price
			this.total.text('$'+total);
            //console.log("total:" + total);
			return this;

		},
		
		events: { 
			'click #order': "orderMessage",
			'click #del': "delProducts",
			'click #showAdd': "toggleAddForm",
			'click #addService': "addService"
		},
		addService: function(s){		
			var stitle = s.get('title'), sprice = Utils.roundToTwo(parseFloat(s.get('price')));
			
			// var newFile = this.$('#fileData').val();
            // var newFilename = this.$('#fileName').val();
            
			console.log("sprice:" + sprice);

			//this.services.create({ title: stitle, price: sprice, checked: false, image: s.get('image')});
			if ( s.get('image') ){
				this.services.create({ title: stitle, price: sprice, checked: false, image: s.get('image')});
			}else{
				this.services.create({ title: stitle, price: sprice, checked: false});
			}
			this.createServiceViews();
			this.services.trigger('change',{});
		},

		orderMessage: function(event){
			this.uncheckAll();
		},
		uncheckAll: function(){
			var total = 0;

			_.each(this.services.getChecked(), function(elem){
				elem.toggle();
			});
		},
		delProducts: function(event){
			
			var self = this;
			_.each(this.services.getChecked(), function(elem){
				
				var elemid = elem.get("_id");
				self.services.where({_id: elemid})[0].destroy();
				
			});
			this.createServiceViews();
			this.services.trigger('change',{});
			
		}

	});
	return ChooserView;

});