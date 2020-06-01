// DECLARING VARIABLE
var level = 0;

var userClickedPattern = [] ;

var gamePattern = [];

var buttonColors = ["red" , "blue", "green" , "yellow"];

var started = false ;


// CREATING A RANDOM SEQUENCE
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.round((Math.random()*3));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(".btn."+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


// RECEIVING CLICK , SETTING USER CLICKED PATTERN , MAKING SOUNDS , CREATING ANIMATION
$("div.btn").click(function(){
var userChosenColor=$(this).attr("id");
userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1)
});

// CREATING ANIMATION

function animatePress(currentColor) {
  $("."+currentColor).addClass("pressed");
  setTimeout(function() {
    $("."+currentColor).removeClass("pressed");
  }, 100);
}


// STARTING THE GAME
$(document).on("keypress" , function() {
  if (! started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// PLAYING SOUND
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// RESTARTING THE GAME
function startOver() {
  started= false;
  level=0;
  gamePattern=[];
}


// CHECKING THE ANSWER
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
    if (gamePattern.length===userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000 );
    }
  }
  else {

    new Audio("sounds/wrong.mp3").play();
    console.log("wrong")
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();

  }
}
