define([
  'jquery',
  'underscore',
  'backbone',
  'service',
  'servicelist',
  'serviceview',
  'dispatcher',
  'utils'
], function($,_, Backbone,Service,ServiceList,ServiceView,dispatcher,Utils) {
// The main view of the application
	var ChooserView = Backbone.View.extend({

		// Base the view on an existing element
		el: $('#main'),
		

		initialize: function(options){
			this.total = $('#total span');
			this.services = options.collection;
			
			
			this.services.on("reset", this.render, this);
	        this.render();
	 
	        //this.services.on("add", this.renderBook, this);
	        /*this.services.on("remove", this.removeBook, this);
	        */
			// Cache these selectors
			this.list = $('#services');
		
			this.listenTo(this.services, 'change', this.render);
			dispatcher.on('add', this.addService, this);

			this.createServiceViews();
			
		},

		createServiceViews: function(){
			this.list.empty();
			
			// Create views for every one of the services in the
			// collection and add them to the page
			
			this.services.each(function(service){

				var view = new ServiceView({ model: service });
				this.list.append(view.render().el);

			}, this);	// "this" is the context in the callback
		},

		render: function(){

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
			//$("#total span").text('$'+total);
			this.total.text('$'+total);

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
			console.log("sprice:" + sprice);
			this.services.create({ title: stitle, price: sprice, checked: false});
			
			// this.services.fetch();
			this.createServiceViews();
			this.services.trigger('change',{});

			
		},

		orderMessage: function(event){
			this.uncheckAll();
		},
		uncheckAll: function(){
			var total = 0;

			_.each(this.services.getChecked(), function(elem){
				//console.log("elem",elem);
				elem.toggle();
			});
		},
		delProducts: function(event){
			//console.log("services:",this.services);
			var self = this;
			_.each(this.services.getChecked(), function(elem){
				console.log("elem",elem);
				//elem.toggle();
				var elemid = elem.get("_id");
				//self.services.remove(self.services.findWhere({_id: elemid}));
				//self.services.remove(self.services.where({ "_id": elemid}));
				self.services.where({_id: elemid})[0].destroy();
				
				console.log("removed model id:" + elemid);
				
			});
			this.createServiceViews();
			this.services.trigger('change',{});
			//this.serices.trigger('reset',{});
		}

	});
	return ChooserView;

});