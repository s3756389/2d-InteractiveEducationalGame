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

// need to add Spelling.html path for final version
function spellingButton(){
    // var sURL = 
    // window.location = sURL;
}

function mathButton(){
    // currently the file path, will need to change it to the Math.html path for final version
    var mURL = "file:///C:/Users/User/Documents/Visual%20Studio%202017/MathematicsInteractivity/Math.html"
    window.location = mURL;
}


