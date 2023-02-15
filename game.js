var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"]
var gameHasStarted = false;
var level = 0;


//Keystroke event listener to initiate the game.
$(document).keydown(function() {
    
    if(!gameHasStarted) {

    setTimeout(function() {
        $("#level-title").text("Level: ");
        nextSequence()
    }, 750);

    gameHasStarted = true;

    }
})

// OnClick event listener added to each button. Calls the playSound(), animatePress() and checkAnswer() functions.
$(".btn").click(function(){
    if(gameHasStarted) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1)
    }
})

// Verifies the answers in the user's response by comparing each element in the user array to the game pattern array.
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        setTimeout(startOver(), 300);
      }
}

// Adds the next button element to the game pattern array. Also updates the h1 to show that the user has advanced to the next level.
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var nextNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[nextNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

//Plays the audio file associated with each color or a wrong answer.
function playSound(name) {
   
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Adds a shadow and changes the background color to gray of the button that was pressed.
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

// Resets the game after user has answered incorrectly.
  function startOver() {
    level = 0;
    gamePattern = [];
    gameHasStarted = false;
  }
