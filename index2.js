var btnColors=["red","blue","yellow","green"];
var gamePattern=[];
var userPattern=[];
var lvl=0;
var started=false;
// to generate a pattern which has to be followed
function nextSequence()
{   
    // to reset the user clicked pattern for next round
    userPattern=[];

    // to register a random pattern of btn press
    var randNo=Math.floor(Math.random()*4);
    var randChosenCol=btnColors[randNo];
    gamePattern.push(randChosenCol);
    console.log("gamePattern="+gamePattern);

    // to add animation 
    $("#"+randChosenCol).fadeIn(100).fadeOut(100).fadeIn(100);

    // to add audio
    var audio =new Audio("sounds/"+randChosenCol+".mp3");
    audio.play();

    lvl++;
    $("h1").text("Level "+lvl);
    // console.log(lvl);
    // console.log(gamePattern.length);

}

// to perform specific functions when an event takes place
$(".btn").click(function()
{
    // to register the user pattern of btn press
    var userChosenCol=$(this).attr("id");
    userPattern.push(userChosenCol);
    console.log("userPattern="+userPattern);

    // to add audio
    var audio =new Audio("sounds/"+userChosenCol+".mp3");

    audio.play();
    // to add animation
    $("#"+userChosenCol).addClass("pressed");
    setTimeout(function(){$("#"+userChosenCol).removeClass("pressed");},100);

    checkAnswer(userPattern.length-1);
});

// to check for key input
$(document).on("keydown",function(){
    // now we will call the function nextSequence() for 1 time to start the game
    // it will only work for 1 time as started will become true after 1st time
    if(!started)
    {
        nextSequence();
        started=true;
    }
    
})
// to check if user choose correctly or not
function checkAnswer(currentLvl){
    if(userPattern[currentLvl]===gamePattern[currentLvl])
    {
        console.log("success");
        if(userPattern.length===gamePattern.length)
        {
            setTimeout(nextSequence(),1000);
        }
    }
    else{
        console.log("wrong");

        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)

        var audio=new Audio("sounds/wrong.mp3");
        audio.play();

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    lvl=0;
    gamePattern=[];
    started=false;
}