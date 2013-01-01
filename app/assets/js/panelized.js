(function($){

var methods = {
  init: function(options) {

    console.log("init fired");

    return this.each(function(){

      var $this = $(this),
          data = $().data('panelized'),
          panelized = $('<div />', {
            text: $this.attr('title')
          }),
          docheight = $(document).height(),
          winheight = $(window).height(),
          slideCollection = $this.children(),
          hash = $().panelized('getHash');

      // Set current panel
      if(!hash)
        $().panelized('setCurrentPanel', 0);
      else {
        $.each(slideCollection, function(index, value) {
          if(hash == $(value).attr('id'))
            $().panelized('setCurrentPanel', index);
        });
      }

      // Listener for hash change
      window.onhashchange = function(event) {
        console.log("onhashchange: location: " + document.location.href);
      };
      

      if(!data){ // More setup here
        
        $(this).data('panelized', {
          target: $this,
          panelized: panelized,
          docHeight: docheight,
          winHeight: winheight,
          hash: hash
        });

      }

    });

  },
  getCurrentPanel: function() {
    return false;
  },

  setCurrentPanel: function(panel) {
    console.log("current panel set to: " + panel);
  },

  isMobile: function() {
    return false;
  },

  getHash: function() {
    var hash = window.location.hash.replace('#/', '');
    console.log("Hash start - " + hash);
    var item = hash;

    if(item != null)
      return item;
    return '';
  },

  setHash: function(id) {
    window.location.hash = "/" + id;
  },

  onHashChange: function() {
    var target = $().panelized('getHash');
    console.log("Hash change - " + target);
    if(target === '') return;
    
    $().panelized('scrollToItem', target);
  },

  scrollToItem: function(item) {

  },

  scrollToNext: function() {
    $().panelized('scrollToItem', $().panelized('getCurrentPanel') + 1);
  },

  scrollToPrev: function() {
    $().panelized('scrollToItem', $().panelized('getCurrentPanel') - 1);
  }
};

$.fn.panelized = function(method) {


  // Initialize
//  var winHeight, currentSlide;
//  var panelCollection = this.children();
//  var panelCount = panelCollection.size();


  if(methods[ method ]){
    return methods[ method ].apply(this, Array.prototype.slice.call( arguments, 1));
  } else if(typeof method === 'object' || !method ) {
    return methods.init.apply(this, arguments);
  } else {
    $.error('Method ' + method + ' does not exist on jQuery.panelized');
  }

//  if(!target){ // If NO target
//
//    console.log("no target");
//
//  } else { // target exists
//
//    console.log("target");
//
//  }

};

})(jQuery);
