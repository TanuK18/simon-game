var buttonColors=["green","red","yellow","blue"];

var gamePattern=[];

var userlickedPattern=[];

var started=false;

var level=0;

$(document).on("keydown",function(event){
    if(!started)
    {
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function nextSequence()
{
    userlickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor); 
}

$(".btn").click(function(){
   var userChosenColor=this.getAttribute("id");
   userlickedPattern.push(userChosenColor);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(userlickedPattern.length-1);
});

function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play(); 
}

function animatePress(currentColor)
{
       $("#"+currentColor).addClass("pressed");
       setTimeout(function(){
           $("#"+currentColor).removeClass("pressed")
       },100);
}

function checkAnswer(currentLevel)
{     
        if (userlickedPattern[currentLevel]==gamePattern[currentLevel])
         { 
            if(userlickedPattern.length==gamePattern.length)
            {
                setTimeout(function () {
                    nextSequence();
                  }, 1000);
            }
         }
         else
         {
            wrongAnswer();
         }
     
     
}
function wrongAnswer()
{
    var audio=new Audio("sounds/wrong.mp3");
    audio.play(); 
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
        },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    started=false;
    level=0;
    gamePattern=[];
}






