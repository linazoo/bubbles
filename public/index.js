var score = 0;
var color = "blue";

function random(min,max){
 	return Math.round(Math.random() * (max-min) + min);
}

function setBG(){
  if (Math.round(Math.random())){
    return "https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Decorative-Elements-PNG/Transparent_Bubble_PNG_Clip_Art_Image.png";
  } else {
    return "https://opengameart.org/sites/default/files/BubbleSimple.png";
  }
}



function dropBox(){
  var length = random(100, ($(".game").width() - 100));
  var velocity = random(850, 10000);
  var size = random(50, 150);
  var thisBox = $("<div/>", {
    class: "box",
    style:  "width:" +size+ "px; height:"+size+"px; left:" + length+  "px; transition: transform " +velocity+ "ms linear;"
  });
  

  var pointValue = size < 100 ? 2 : 1;

  thisBox.data('points', pointValue);

  //set data and bg based on data
  thisBox.data("pop", Math.round(Math.random()));
  if(thisBox.data("pop")){
    thisBox.css({"background": "url('https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Decorative-Elements-PNG/Transparent_Bubble_PNG_Clip_Art_Image.png')", "background-size":"contain"});
  } else {
    thisBox.css({"background": "url('https://opengameart.org/sites/default/files/BubbleSimple.png')", "background-size":"contain"});
  }
  
  //insert gift element
  $(".game").append(thisBox);
  
  //random start for animation
  setTimeout(function(){
    thisBox.addClass("move");
  }, random(0, 5000) );
  
  //remove this object when animation is over
  thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              function(event) {
    $(this).remove();
  });
}

for (i = 0; i < 10; i++) { 
  dropBox();
}

$(document).on('click', '.box', function(){
  score += $(this).data('points')
  $(".score").html(score);
  $(this).remove();
});

var runGame = setInterval(function(){
                for (i = 0; i < 10; i++) { 
                  dropBox();
                }  
              }, 5000);

function countdown() {
    	var seconds = 60;
	    function tick() {
	        var counter = document.getElementById("counter");
	        seconds--;
	        counter.innerHTML = (seconds < 10 ? "0" : "")  + String(seconds) + "S";
	        if( seconds > 0 ) {
	            setTimeout(tick, 1000);
	            draw();
	   			update();
	        } else {
	            alert("Game over");
	            clearInterval(runGame);
	        }
	    }
    	tick();
	}

countdown();
