// Filename: router.js
define([
  'jquery',
  'async',
  'underscore',
  'backbone',
  'chooserview',
  'addserviceview',
  'flashmessageview',
  'servicelist',
  'utils'
  /*'views/library/LibraryView',
  'facebook',
  'models/person/person'*/
], function($, async, _, Backbone, ChooserView, AddServiceView,FlashMessageView,ServiceList,Utils /*, LibraryView, facebook, FacebookPerson */) {
  
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'home' : 'defaultHome',
      'about': 'showAbout',
      'contact': 'showContact',
      
      // Default
      '*actions': 'defaultAction',
      '': 'defaultAction'
    }
  });
  
  
  var initialize = function(){
    console.log("initialize called");
    var flashView = new FlashMessageView();
    //var addformView = new AddServiceView();
    var services = new ServiceList();
    
    var app_router = new AppRouter;

    var mainView = new ChooserView({collection: services, router: app_router});
    //var libraryView = new LibraryView(false, facebookUser);
    app_router.on('route:showAbout', function(){
      Utils.activeLink('About');
      $("#Wcontainer").empty();
      (new AddServiceView()).render();
    });

    app_router.on('route:showContact', function () {
      Utils.activeLink('Contact');
      
      var mainView = new ChooserView({collection: services, router: this});
      mainView.render();
    });
    
    app_router.on('route:defaultHome', function () {
      $("#Wcontainer").empty();
      Utils.activeLink('Home');
      mainView.render();
    });

    app_router.on('route:defaultAction', function (actions) {
      Utils.activeLink('Home');
      services.fetch({
        success: function(collection, response, options){
          mainView.render();
        },
        error: function(collection, response, options){
          console.log("error fetching services, status:", response);
        }  
	    });
	  });

    Backbone.history.start();

  };
  return { 
    initialize: initialize
  };

});
