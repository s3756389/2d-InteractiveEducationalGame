function init() {
    var stage;
    var sun;
    var grass;
    var sky;
    var player;
    stage = new createjs.Stage("demoCanvas");
    sky = new createjs.Shape();
    sky.graphics.beginLinearGradientFill(["#FFF", "#0FF"], [0,1], 0, 550, 0, 0).drawRect(0,0, 1024, 550);
    sun = new createjs.Shape();
    sun.graphics.beginFill("yellow").drawCircle(824, 150, 100);
    grass = new createjs.Shape();
    grass.graphics.beginFill("green").drawRect(0, 718, 1024, 50);
    player = new createjs.Shape();
    player.graphics.beginFill("black").drawCircle(100, 693, 50);
    stage.addChild(sky);
    stage.addChild((sun));
    stage.addChild(grass);
    stage.addChild(player);

    manifest = [{src:"assets/Cartoon_cloud.svg", id:"cloud"}];

    loader = new createjs.LoadQueue(true);
    loader.addEventListener("complete", handleComplete);
}

function handleComplete() {
    createjs.Tween.get(player, {loop: 1}).to({x: 1024},  500, createjs.Ease.linear());
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}