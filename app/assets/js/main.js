var currentSlide = 0;
var wintop, docheight, winheight, targetHeight, totalSlides, totalHeight, hash, slidesGroup;
var delta = 200;
var scrollHandlerSet = false;
var directLink = false;
var isOnStartup = true;

function is_mobile(){
  return false;
}

function getHash(){
  var hash = window.location.hash.replace('#/', '');
  console.log(hash);
  var item = hash;
  if(item != null)
    return item;
  return '';
}

function setHash(id){
  window.location.hash = "/" + id;
}

function onHashChange(){
  var target = getHash();
  console.log(target);
  if(target === '') return;
  
  scrollToItem(target);
}

function init(){

  hash = getHash();

  wintop = $(window).scrollTop();
  docheight = $(document).height();
  winheight = $(window).height();
  totalSlides = $("#main-content").children().size();
  slidesGroup = $("#main-content").children();
  totalHeight = winheight * totalSlides;
  targetHeight = winheight*(currentSlide+1);

  $("#main-content").height(totalHeight); 
  $("#main-content").children().height(winheight);

  setupScrollHandler();
}

function scrollToItem(target){

  _.each(slidesGroup, function(n){ 

      
  });

  if (targetSlide > currentSlide) {
    console.log("scroll back to " + target);
  } else if (targetSlide < currentSlide) {
    console.log("scroll forward to " + target);
  }

}

function scrollNext(){

  if(currentSlide < totalSlides-1){
    currentSlide += 1;
    $("#main-content .panel:nth-child("+currentSlide+")").css("position", "absolute").animate(
      { top: -winheight},
      { duration: 1500, easing: 'swing', complete: function(){}}
    );
    $("body").animate(
      { scrollTop: winheight*currentSlide},
      { duration: 1500, easing: 'swing', complete: function(){}}
    );
  }
  console.log(currentSlide);
}

function scrollPrev(){

  if(currentSlide > 0){
    $("#main-content .panel:nth-child("+currentSlide+")").css("position", "absolute").animate(
      { top: 0},
      { duration: 1500, easing: 'swing', complete: function(){}}
    );
    $("body").animate(
      { scrollTop: winheight*currentSlide-1},
      { duration: 1500, easing: 'swing', complete: function(){}}
    );
    currentSlide -= 1;
  }
  console.log(currentSlide);
}



var tempScrollTop, currentScrollTop = 0;

function setupScrollHandler() {

  if(!scrollHandlerSet){

    scrollHandlerSet = true;

    if(!is_mobile()) {

      

      $(window).bind("scroll", function(e) {

        e.preventDefault();
        isScrolling = true;


        console.log("Scroll top: " + $(window).scrollTop() + " - Prev scroll top: " + tempScrollTop);
        console.log(e);
        tempScrollTop = $(window).scrollTop();

      });

    }
  }
}


$(window).bind('hashchange', onHashChange);
init();


