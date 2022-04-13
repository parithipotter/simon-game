var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var started = false;
var userClickPatter = [];
var level = 0;

$(document).keypress(function () { 
    if(!started){
        $("#level-title").text("Level "+level);
        newSequence();
        started = true;
    }
});


$(".btn").click(function () { 
    var userChosenbtn = $(this).attr("id");
    userClickPatter.push(userChosenbtn);
    
    PlaySound(userChosenbtn);
    animatePress(userChosenbtn,"pressed");
    checkAnswer(userClickPatter.length-1);
    
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickPatter[currentLevel]) {

      console.log("success");

      if (userClickPatter.length === gamePattern.length){

        setTimeout(function () {
          newSequence();
        }, 1000);

      }

    } else {
        console.log("wrong!");
        var body = $("body");
        body.addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        PlaySound("wrong");
        setTimeout(function(){
            body.removeClass("game-over");
            
        },200)
        Restart();

    }

}




function newSequence(){
    userClickPatter = [];

    level ++;
    $("#level-title").text("Level "+level);
    var randomNumer = Math.floor(Math.random()*4 );
    var randomChosenColour = buttonColors[randomNumer];
    gamePattern.push(randomChosenColour);
    var buttonSelected = $("#"+randomChosenColour);
    buttonSelected.fadeIn(100).fadeOut(100).fadeIn(100);
    PlaySound(randomChosenColour,"pressed");
 
}
function PlaySound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatePress(currentcolour,classname){
    $("#"+currentcolour).addClass(classname);
   
    setTimeout(function(){
        $("#"+currentcolour).removeClass(classname);
    },100)
   
}

function Restart(){
    level = 0;
    gamePattern = [];
    started = false;
}