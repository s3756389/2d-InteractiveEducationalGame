// https://github.com/olsn/Collision-Detection-for-EaselJS

var bg;
var w, h;
var stage;
var sun;
var grass;
var sky;
var player;
var cloud;
var data;
// Get the letters of the word plus 5 random characters.
var Letters = [];
var varNames = [];
var balloonsAdded = false;
var playerAdded = false;
var remainingLetters;

const words = [{ word: "cat", level: 1 },
{ word: "dog", level: 1 },
{ word: "pet", level: 1 },
{ word: "bird", level: 2 },
{ word: "door", level: 2 },
{ word: "band", level: 2 },
{ word: "north", level: 3 },
{ word: "earth", level: 3 },
{ word: "river", level: 3 }];

function init() {

    stage = new createjs.Stage("demoCanvas");

    w = stage.canvas.width;
    h = stage.canvas.height;

    manifest = [{ src: "assets/clouds.png", id: "clouds", type: createjs.Types.INAGE },
    { src: "assets/treeSmall.png", id: "tree", type: createjs.Types.IMAGE },
    { src: "assets/idle.png", id: "idle", type: createjs.Types.IMAGE },
    { src: "assets/Jump.png", id: "jump", type: createjs.Types.IMAGE },
    { src: "assets/Run.png", id: "run", type: createjs.Types.IMAGE },
    { src: "assets/A.png", id: "A", type: createjs.Types.IMAGE },
    { src: "assets/B.png", id: "B", type: createjs.Types.IMAGE },
    { src: "assets/C.png", id: "C", type: createjs.Types.IMAGE },
    { src: "assets/D.png", id: "D", type: createjs.Types.IMAGE },
    { src: "assets/E.png", id: "E", type: createjs.Types.IMAGE },
    { src: "assets/F.png", id: "F", type: createjs.Types.IMAGE },
    { src: "assets/G.png", id: "G", type: createjs.Types.IMAGE },
    { src: "assets/H.png", id: "H", type: createjs.Types.IMAGE },
    { src: "assets/I.png", id: "I", type: createjs.Types.IMAGE },
    { src: "assets/J.png", id: "J", type: createjs.Types.IMAGE },
    { src: "assets/K.png", id: "K", type: createjs.Types.IMAGE },
    { src: "assets/L.png", id: "L", type: createjs.Types.IMAGE },
    { src: "assets/M.png", id: "M", type: createjs.Types.IMAGE },
    { src: "assets/N.png", id: "N", type: createjs.Types.IMAGE },
    { src: "assets/O.png", id: "O", type: createjs.Types.IMAGE },
    { src: "assets/P.png", id: "P", type: createjs.Types.IMAGE },
    { src: "assets/Q.png", id: "Q", type: createjs.Types.IMAGE },
    { src: "assets/R.png", id: "R", type: createjs.Types.IMAGE },
    { src: "assets/S.png", id: "S", type: createjs.Types.IMAGE },
    { src: "assets/T.png", id: "T", type: createjs.Types.IMAGE },
    { src: "assets/U.png", id: "U", type: createjs.Types.IMAGE },
    { src: "assets/V.png", id: "V", type: createjs.Types.IMAGE },
    { src: "assets/W.png", id: "W", type: createjs.Types.IMAGE },
    { src: "assets/X.png", id: "X", type: createjs.Types.IMAGE },
    { src: "assets/Y.png", id: "Y", type: createjs.Types.IMAGE },
    { src: "assets/Z.png", id: "Z", type: createjs.Types.IMAGE },
    { src: "assets/Run1.png", id: "player", type: createjs.Types.IMAGE },
    { src: "assets/SunSmall.png", id: "sun", type: createjs.Types.IMAGE }];

    loader = new createjs.LoadQueue(false);

    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest);
    // loader.loadFile({ src: "/assets/Cartoon_cloud.svg", id: "clouds" });
}

function handleComplete() {

    // Get the list of the words at a certain level when we read in the level for the user.
    var levelWords = words.filter(function (word) { return (word.level == 1); });
    // Randomly, get a word from the list of words for the specific level.
    var chosenWord = levelWords[Math.floor(Math.random() * levelWords.length)];

    // Push the letters of the word onto the Letters array.
    for (let i = 0; i < chosenWord.word.length; i++) {
        chosenWord.word = chosenWord.word.toUpperCase();
        Letters.push(chosenWord.word.charAt(i));
    }

    // Add 5 random letters.
    var maxChars = chosenWord.word.length + 5;

    // Push 5 random letters onto the array if they are not in the chosenWord.word
    while (Letters.length < maxChars) {
        var answer = Math.floor(Math.random() * 26) + 65;
        var randomLetter = String.fromCharCode(answer);
        if (Letters.includes(randomLetter)) {
            continue;
        } else {
            Letters.push(randomLetter);
        }
    }

    // background from the grass (white) to height of the canvas (blue)
    var background = new createjs.Shape();
    background.graphics.beginLinearGradientFill(["#FFF", "#00F"], [0, 1], w / 2, 718, w / 2, 0).drawRect(0, 0, w, h);

    // Grass
    grass = new createjs.Shape();
    grass.graphics.beginFill("green").drawRect(0, 718, 1024, 50);

    // Sun
    var sun = new createjs.Bitmap(loader.getResult("sun"));
    sun.x = w - 300;
    sun.y = 200;

    // clouds - add each instance at a random height
    cloud1 = new createjs.Bitmap(loader.getResult("clouds"));
    cloud1.x = w + 200;
    var cloud1height = Math.floor(Math.random() * 500);
    cloud1.y = cloud1height;
    cloud2 = new createjs.Bitmap(loader.getResult("clouds"));
    cloud2.x = w + 600;
    var cloud2height = Math.floor(Math.random() * 500);
    cloud2.y = cloud2height;
    cloud3 = new createjs.Bitmap(loader.getResult("clouds"));
    cloud3.x = w + 1000;
    var cloud3height = Math.floor(Math.random() * 500);
    cloud3.y = cloud3height;

    // Trees
    tree = new createjs.Bitmap(loader.getResult("tree"));
    tree.x = Math.floor(Math.random() * 1024);
    tree.y = 550;

    tree2 = new createjs.Bitmap(loader.getResult("tree"));
    tree2.x = Math.floor(Math.random() * 1024);
    tree2.y = 550;

    // Messages
    var message = "Pick the balloons that spell " + chosenWord.word.toUpperCase();
    counter = new createjs.Text(message, "30px Comic Sans MS", "#ffffff");
    counterOutline = new createjs.Text(message, "30px Comic Sans MS", "#000000");
    counterOutline.outline = 5
    counterOutline.textAlign = 'right'
    counter.textAlign = 'right'
    counterOutline.x = w / 2
    counterOutline.y = 150
    counter.x = w / 2
    counter.y = 150
    counter.alpha = 1
    counterOutline.alpha = 1

    stage.addChild(background);
    stage.addChild(grass);
    stage.addChild((sun));
    stage.addChild(cloud1, cloud2, cloud3);
    stage.addChild(tree);
    stage.addChild(tree2);
    stage.addChild(counter, counterOutline);

    // Tween Trees to give the appearance of moving through the countryside
    // createjs.Tween.get(tree, { loop: -1 }).to({ x: -200 }, 30000, createjs.Ease.linear());
    // createjs.Tween.get(tree2, { loop: -1 }).to({ x: -200 }, 30000, createjs.Ease.linear());

    // Tween Clouds to give the appearance of moving through the countryside
    createjs.Tween.get(cloud1, { loop: -1 }).to({ x: -200 }, 30000, createjs.Ease.linear());
    createjs.Tween.get(cloud2, { loop: -1 }).to({ x: -200 }, 30000, createjs.Ease.linear());
    createjs.Tween.get(cloud3, { loop: -1 }).to({ x: -200 }, 30000, createjs.Ease.linear());

    collisionMethod = ndgmr.checkRectCollision;

    remainingLetters = Letters;

    createjs.Ticker.addEventListener("tick", tick);

    stage.addEventListener("stagemousedown", handleJump);

    console.log(words.length);
}

var sprite = new createjs.SpriteSheet();

function handleJump() {
    // ignore the jump if the sprite isn't at the original position.
    if (player.y == 643) {
        createjs.Tween.get(player).to({ x: 200, y: 643 }).to({ x: 200, y: 450 }, 1000).to({ x: 200, y: 643 }, 1000);
    }
}

function tick(event) {

    // Let's add the balloons.
    if (balloonsAdded == false) {
        for (let i = 0; i < Letters.length; i++) {
            tmpVarName = Letters[i];
            varNames[i] = "Letter" + i;
            varNames[i] = new createjs.Bitmap(loader.getResult(Letters[i]));
            varNames[i].name = tmpVarName;
            varNames[i].x = Math.floor(Math.random() * 5000) + 1024;
            varNames[i].y = 400;
            stage.addChild(varNames[i]);
            createjs.Tween.get(varNames[i], { loop: -1 }).wait(5000).to({ x: -200 }, 30000, createjs.Ease.linear());
        }
        balloonsAdded = true;
    }

    if (playerAdded == false) {
        player = new createjs.Bitmap(loader.getResult("player"));
        player.x = 100;
        player.y = 643;
        playerAdded = true;
    }

    stage.addChild(player);

    var l = stage.numChildren;
    for (let i = 0; i < l; i++) {
        balloon = stage.getChildAt(i);
        if (balloon.name) {
            var collision = ndgmr.checkPixelCollision(balloon, player, 1, true);
            if (collision) {
                var message = "Collision with " + balloon.name;
                Letters.pop(balloon.name);
                createjs.Tween.get(balloon).to({scaleX: -2, scaleY: -2}, 2500, createjs.Ease.linear());
                console.log(message);
                continue;
            }
        }
    }

    if (remainingLetters.length == 0) {
        console.log("You won!");
        var trophyURL = "http://localhost/2d/LevelUp.html?level=1&challenge=Spelling";
        window.open(trophyURL);
    }

    stage.update(event);
}