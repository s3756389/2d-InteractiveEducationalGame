var stage;

function init(){
    stage = new createjs.Stage("homeCanvas");
    createGround();
    createSun();
    stage.update();
}

function createGround(){
    var ground = new createjs.Shape();
    ground.graphics.beginFill('green');
    ground.graphics.drawRect(0, 600, 1024, 170);
    ground.graphics.endFill();
    stage.addChild(ground);
}

function createSun(){
    var sun = new createjs.Shape();
    sun.graphics.beginFill("yellow").drawCircle(824, 150, 100);
    stage.addChild(sun);
}

function spellingButton(){
    var sURL = "C:\Users\User\2d-InteractiveEducationalGame\js\spelling.js"
    window.location = sURL;
}

function mathButton(){
    var mURL = "C:\Users\User\2d-InteractiveEducationalGame\js\math.js"
    window.location = mURL;
}


