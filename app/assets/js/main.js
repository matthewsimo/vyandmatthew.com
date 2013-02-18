(function(){

$(document).ready(function() {

  $("#main-header li a").click(function(e) {
    if($().panelized('isScrolling')){
      e.preventDefault();
    }
  });

  $("#announcing h1").fitText(.9).lettering();
  // Initiate panelized plugin
  $("#main-content").panelized();

  // Wedding Party Tabs
  $("#wedding-party nav a").click(function(e){
    e.preventDefault();
    if(!$(this).hasClass('active')){
      $("#wedding-party nav a").toggleClass("active");
      $("#wedding-party ol").toggle();
    }
  });

  // Set floats on wedding party profiles for cross browser friendliness
//  $("#wedding-party ol li:nth-child(2n+1) section").css("float", "right");
//  $("#wedding-party ol li:nth-child(2n) section").css("float", "left");


  // Wedding party profile interactions
  if($(window).width() <= 768 && $(window).width() > 569) {
    $("#wedding-party .tabs a").click(function() {
      $("#wedding-party .on").removeClass("on");
    });
    $("#wedding-party ol img").click(function(){
      $("#wedding-party .on").removeClass("on");
      $(this).toggleClass("on");
      $(this).parent("li").find("div").toggleClass("on");
    });
  } else {
    $("#wedding-party ol img").hover(function(){
      $(this).parent("li").find("div").addClass('on');
    }, function() {
      $(this).parent("li").find("div").removeClass('on');
    });
  }

  // Mobile tomfoolery
  if($(window).width() < 570) {
    $('#wedding-party ol').each(function(i, e) {
      title = $(this).attr('id');
      $('<h3 class="list-title">'+title+'</h3>').insertBefore(e);
    });

    $('#main-header ol a').each(function(i, e) {
      href = $(this).attr('href');
      $(this).attr('href', '#' + href.split('/#/')[1]);
    });

    $('#main-header .nav-control').click(function() {
      $(this).toggleClass('on');
      $('#main-header ol').slideToggle();
    });

    $('#main-header ol a').click(function() {

      if($('#main-header .nav-control').hasClass('on')){
        $('#main-header .nav-control').toggleClass('on');
        $('#main-header ol').slideToggle();
      }

    });
  }

});
})();
