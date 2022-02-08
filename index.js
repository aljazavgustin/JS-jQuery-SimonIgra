var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(300)
    .fadeOut(300)
    .fadeIn(300);
  playSound(randomChosenColor);
  $("h1").text("Level " + level);
  level++;
}

//Akcija, ko uporabnik pritisne na gumb
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//Funkcija, ki ob pritisku gumba zaigra zvok
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animacija ob pritisku
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Funkcija, ob pritisku gumba na tipkovnici
$(document).keypress(function () {
  if(!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Začetek nove igre in vse parametre ponastaviš
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

//preveriš odgovor uporabnika
function checkAnswer (currentLevel) {
  console.log(gamePattern[currentLevel]);
  console.log(userClickedPattern[currentLevel]);
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(
        function() {
          nextSequence();
        }, 1000
      );
    }
  } else {
    playSound("error");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    })
    startOver();
    $("h1").text("Igre je konec! Stisni katerokoli tipko za ponovitev igre.");
  }
}