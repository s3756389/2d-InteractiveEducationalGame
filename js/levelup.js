var w, h;
var stage;
var img;
var angle;

function init() {

    angle = 0;
    img = new Image();
    img.onload = handleImageLoad;
    img.src = "assets/trophyScaled.png";
}

function stop() {
    createjs.Ticker.removeEventListener("tick", tick);
}

function tick(event) {
    angle += 0.01;
    var value = Math.sin(angle) * 360;

    bmp.rotation = value;
    bmp.scale = value / 360;
    stage.update(event);
}

function handleImageLoad() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const level = urlParams.get("level");
    const challenge = urlParams.get("challenge");

    saveResults(challenge, level);

    var canvas = document.getElementById("demoCanvas");
    stage = new createjs.Stage(canvas);
    stage.autoClear = true;
    bmp = new createjs.Bitmap(img);
    bmp.regX = img.width >> 1;
    bmp.regY = img.height >> 1;
    bmp.x = canvas.width >> 1;
    bmp.y = canvas.height >> 1;
    bmp.scale = 0.1;

    var message = "WOW! You have won the " + challenge + " Challenge for Level " + level;

    counter = new createjs.Text(message, "30px Comic Sans MS", "#ffffff");
    counterOutline = new createjs.Text(message, "30px Comic Sans MS", "#000000");
    counterOutline.outline = 5;
    counterOutline.textAlign = 'right';
    counter.textAlign = 'right';
    counterOutline.x = 924;
    counterOutline.y = 150;
    counter.x = 924;
    counter.y = 100;
    counter.alpha = 1;
    counterOutline.alpha = 1;

    stage.addChild(bmp);
    stage.addChild(counter, counterOutline)
    stage.update();

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function saveResults(challenge, level) {
    var LearningChallenge = "123Learning." + challenge;
    window.localStorage.setItem(LearningChallenge, level);
}

