var stage;
var randNum1
var randNum2;
var op;
var answer;
const CIRCLE_RADIUS = 100;
var incorrectArray = [];

var problemArray = [
    generateAdditionProblem,
    generateSubtractionProblem
]

function init(){
    stage = new createjs.Stage("mathCanvas");
    createSun(); 
    generateProblem();
    
    stage.update();
}

function createSun(){
    var sun = new createjs.Shape();
    sun.graphics.beginFill("yellow").drawCircle(824, 150, 100);
    stage.addChild(sun);
}

function generateAdditionProblem(){
    randNum1 = Math.floor(Math.random() * 5) + 1;
    randNum2 = Math.floor(Math.random() * 5) + 1;
    op = "+";
    answer = (randNum1 + randNum2);
    
    document.getElementById("equation").innerHTML = randNum1 + op + randNum2;
    document.getElementById("bubble3").innerHTML = answer;
    
    while (incorrectArray < 5){
        var incorrectAnswer = Math.floor(Math.random() * 10);

        if (incorrectAnswer == answer) {
            continue;
        } else {
            incorrectArray.push(incorrectAnswer);
        }
    }

    document.getElementById("bubble1").innerHTML = incorrectArray[0];
    document.getElementById("bubble2").innerHTML = incorrectArray[1];
    document.getElementById("bubble4").innerHTML = incorrectArray[2];
    document.getElementById("bubble5").innerHTML = incorrectArray[3];
    document.getElementById("bubble6").innerHTML = incorrectArray[4];
}

function generateSubtractionProblem(){
    randNum1 = Math.floor(Math.random() * 10) + 1;
    randNum2 = Math.floor(Math.random() * randNum1) + 1;
    op = "-";
    answer = (randNum1 - randNum2);
    
    document.getElementById("equation").innerHTML = randNum1 + op + randNum2;
    document.getElementById("bubble3").innerHTML = answer;

    while (incorrectArray < 5){
        var incorrectAnswer = Math.floor(Math.random() * 10);

        if (incorrectAnswer == answer) {
            continue;
        } else {
            incorrectArray.push(incorrectAnswer);
        }
    }
    
    document.getElementById("bubble1").innerHTML = incorrectArray[0];
    document.getElementById("bubble2").innerHTML = incorrectArray[1];
    document.getElementById("bubble4").innerHTML = incorrectArray[2];
    document.getElementById("bubble5").innerHTML = incorrectArray[3];
    document.getElementById("bubble6").innerHTML = incorrectArray[4];
}

function generateProblem(){
    var problem = problemArray[Math.floor(Math.random() * problemArray.length)];
    problem.call();
}

function correct(){
    alert("Correct answer! Congratulations!");
    location.reload();
    return false;
}

function incorrect(){
    alert("Oops! The correct answer was " + answer + "!");
    location.reload();
    return false;
}

// function randInc(){
//     var incorrectArray = [];
    
//     while (incorrectArray < 5){
//         var incorrectAnswer = Math.floor(Math.random() * 10);

//         if (incorrectAnswer == answer) {
//             continue;
//         } else {
//             incorrectArray.push(incorrectAnswer);
//         }
//     }
// }




















