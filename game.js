var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

function nextSequence(){
  userClickedPattern = [];
  level = level + 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColors[randomNumber];

  gamePattern.push(randomChosenColour);

  var curPattern = $("#" + randomChosenColour);
  curPattern.fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}

$(".btn").click(function() {
  // var userChosenColour = e.target.id;
  // "this" need to use $
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log("btn: " + gamePattern);
})

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  var curColorSelector = $("#" + currentColour);
  curColorSelector.addClass("pressed");
  setTimeout(function() {
    curColorSelector.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

  console.log(userClickedPattern);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("same");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
