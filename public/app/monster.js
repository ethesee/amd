"use strict";

define(['app/coffin'], function (coffin) {  
  var estimated_age = 99 + 1;
  var spookySaying = 'I vant to suck your blooood!';

  return {
    name: 'Dracula',
    home: 'Florida',
    age: estimated_age,
    saySomethingSpooky: function() {
      return spookySaying;
    },
    goToSleep: function(foo) {
      foo = (typeof foo !== 'undefined') ? foo : this.name;
      return coffin.open() + '<br>Time for bed ' + '<strong>' + foo + '</strong>';
      //coffin.open();
    }
  };

});