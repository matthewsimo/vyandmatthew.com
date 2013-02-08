(function(){

  $("#announcing h1").fitText(.9).lettering();
  // Initiate panelized plugin
  $("#main-content").panelized();

  // Implement scrolling listner & overrider


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
  $("#wedding-party ol img").hover(function(){
    console.log("Profile toggle.");
    $(this).parent("li").find("div").toggle();

  });



})();
