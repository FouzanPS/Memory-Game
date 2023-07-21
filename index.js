var colors = ['red','green','yellow','blue'];
var colorPattern = [];
var userSelectedPartern = [];
var started = false;
var level = 0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){
    var userClicked = $(this).attr("id");
    userSelectedPartern.push(userClicked);
    playSound(userClicked);
    animateButton(userClicked);
    checkAnswer(userSelectedPartern.length-1)
})

function checkAnswer(current){
    if(colorPattern[current]===userSelectedPartern[current]){
        console.log("success");
        if(userSelectedPartern.length===colorPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else {
        console.log("wrong");
        var beat = new Audio("sounds/wrong.mp3");
        beat.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function nextSequence(){
    userSelectedPartern = [];
    level++;
    $("#level-title").text("Level "+level);
    var ranNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = colors[ranNumber];
    colorPattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(60).fadeIn(10).fadeOut(40).fadeIn(100);
    playSound(randomChoosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animateButton(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}

function startOver(){
    level = 0;
    colorPattern = [];
    started = false;
}



    
