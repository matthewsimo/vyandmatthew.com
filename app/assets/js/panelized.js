(function($){

var methods = {
  init: function(options) {

    console.log("init fired");

    return this.each(function(){

      var $this = $(this),
          data = $().data('panelized'),
          docheight = $(document).height(),
          winheight = $(window).height(),
          slideCollection = $this.children(),
          hash = $().panelized('getHash'),
          currentPanel = 0;

      // Listener for hash change
      window.onhashchange = function(event) {
        var panelizedObj, currentPanel;
        panelizedObj = $('#main-content').data('panelized');
        currentPanel = $().panelized('calculatePanel');

        if( panelizedObj.currentPanel !== currentPanel){
          $().panelized('scrollToItem', currentPanel);
        }
      };

      if(!data){ 
        
        $(this).data('panelized', {
          target: $this,
          slideCollection: slideCollection,
          docHeight: docheight,
          winHeight: winheight,
          currentPanel: 0,
        });

      }

      // start up set current panel
      if(hash){
        $().panelized('scrollToItem', $().panelized('calculatePanel'));
      }

    });

  },

  calculatePanel: function() {
    var panelizedObj = $('#main-content').data('panelized');

    $.each(panelizedObj.slideCollection, function(index, value) {
      if($().panelized('getHash') == $(value).attr('id'))
        currentPanel = index;
    });
    return currentPanel;
  },

  getCurrentPanel: function() {
    var panelizedObj = $('#main-content').data('panelized');
    return panelizedObj.currentPanel;
  },

  setCurrentPanel: function(panel) {
    var panelizedObj = $('#main-content').data('panelized');
    panelizedObj.currentPanel = panel;
    $('#main-content').data('panelized', panelizedObj);
  },

  isMobile: function() {
    return false;
  },

  getHash: function() {
    var hash = window.location.hash.replace('#/', '');

    if(hash != null)
      return hash;
    return '';
  },

  setHash: function(id) {
    window.location.hash = "/" + id;
    
    var panelizedObj = $('#main-content').data('panelized');
    panelizedObj.hash = id;
    $('#main-content').data('panelized', panelizedObj);
  },

  scrollToItem: function(item) {
    var currentPanel = $().panelized('getCurrentPanel');

    if(item > currentPanel){

      $("#main-content > div").eq(currentPanel).css('z-index', 6);
      $("#main-content > div").eq(item).css({'top': "0%", 'z-index': 5}).show();
      $("#main-content > div").eq(currentPanel).animate({'top': "-100%"},1000, function(){
        $("#main-content > div").eq(currentPanel).hide().css('bottom', 0).css('z-index', 1);
      });

    } else if (item < currentPanel){

      $("#main-content > div").eq(item).css({'top': "-100%", 'z-index': 6}).show();
      $("#main-content > div").eq(item).animate({'top': "0%"},1000, function() {
        $("#main-content > div").eq(currentPanel).css({'top': "0%", 'z-index': 1}).hide();
        $("#main-content > div").eq(item).css('z-index', 5);
      });

    } else {
      return false;
    }

    // Update new currentPanel
    $().panelized('setCurrentPanel', item);

  },

  scrollToNext: function() {
    $().panelized('scrollToItem', $().panelized('getCurrentPanel') + 1);
  },

  scrollToPrev: function() {
    $().panelized('scrollToItem', $().panelized('getCurrentPanel') - 1);
  },

};

$.fn.panelized = function(method) {

  if(methods[ method ]){
    return methods[ method ].apply(this, Array.prototype.slice.call( arguments, 1));
  } else if(typeof method === 'object' || !method ) {
    return methods.init.apply(this, arguments);
  } else {
    $.error('Method ' + method + ' does not exist on jQuery.panelized');
  }

};

})(jQuery);
