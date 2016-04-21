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
      'about': 'showAbout',
      'contact': 'showContact',
      
      // Default
      '*actions': 'defaultAction',
      '': 'defaultAction'
    }
  });
  
  
  var initialize = function(){
    
    var app_router = new AppRouter;
    
    //var libraryView = new LibraryView(false, facebookUser);
    app_router.on('route:showAbout', function(){
      
      Utils.activeLink('About');
      // $('.nav.navbar-nav li.active').removeClass('active');
      // var az = $(".nav.navbar-nav li"); //.find('a');
      // az.each(function(index){
       
      //   var ltext = $("a",az[index]).text();
        
      //   if ( ltext === 'About'){
      //     console.log("found About");
      //     console.log("az:", az[index]);
      //     $(this).addClass("active");
      //   }
      // });
      
      
    });

    app_router.on('route:showContact', function () {
      Utils.activeLink('Contact');
    });
     
    app_router.on('route:defaultAction', function (actions) {
    	var services = new ServiceList();
    	services.fetch({
    		success: function(c,p,t){
    			var mainView = new ChooserView({collection: services});
    		}
    	});     
	    
	    
        var addformView = new AddServiceView();
        var flashView = new FlashMessageView();
	});
	   
        
    

    // Unlike the above, we don't call render on this view as it will handle
    // the render call internally after it loads data. Further more we load it
    // outside of an on-route function to have it loaded no matter which page is
    // loaded initially.
    /*var footerView = new FooterView();*/
 
    //libraryView.selectMenuItem('home-menu');
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
