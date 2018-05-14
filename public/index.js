var score = 0;
var color = "blue";

// create a utility function for getting random numbers

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


// Create a function that will drop bubbles from the top of the screen 
function dropBox() {
  var length = random(100, ($(".game").width() - 100));
  // the slowest they can go is 10 seconds the fastest they ca go is 850 ms 
  var velocity = random(850, 10000);
  var size = random(50, 150);
  var thisBox = $("<div/>", {
    class: "box",
    style: "width:" + size + "px; height:" + size + "px; left:" + length + "px; transition: transform " + velocity + "ms linear;"
  });

  // if they're less than 100 pixels wide the bubbles are worth 2 points if they are bigger they're worth 1
  var pointValue = size < 100 ? 2 : 1;

  // adding a data attribute for the pointValue
  thisBox.data('points', pointValue);

  //set data attribute 
  thisBox.data("pop", Math.round(Math.random()));
  if (thisBox.data("pop")) {
    thisBox.css({ "background": "url('https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Decorative-Elements-PNG/Transparent_Bubble_PNG_Clip_Art_Image.png')", "background-size": "contain" });
  } else {
    thisBox.css({ "background": "url('https://opengameart.org/sites/default/files/BubbleSimple.png')", "background-size": "contain" });
  }

  //insert bubble into game
  $(".game").append(thisBox);

  //random start for animation
  setTimeout(function () {
    thisBox.addClass("move");
  }, random(0, 1000));

  //remove this object when animation is over
  thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
    function (event) {
      $(this).remove();
    });
}

// set up a click event for each bubble
$(document).on('click', '.box', function () {
  score += $(this).data('points')
  $(".score").html(score);
  $(this).remove();
});

var interval = 500,
  value = 0,
  playing = false,
  time = null;

$("#start").click(function () {
  if (!playing) {
    timer = setInterval(dropBox, interval);
    playing = true;
    this.innerHTML = "Pause"
  } else {
    clearInterval(timer);
    playing = false;
    this.innerHTML = "Start"
  }
});