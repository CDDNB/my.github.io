var stage = new createjs.Stage("wrapper");
var container_indoor = new createjs.Container(), container_outdoor = new createjs.Container(), container = new createjs.Container();
stage.addChild(container_indoor);
stage.addChild(container_outdoor);
stage.addChild(container);
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick", stage);
function adjust_screen(){
    canvas = document.getElementById("wrapper");
    canvas.width = 1920
    canvas.height = 1080
    if(document.documentElement.clientWidth <= document.documentElement.clientHeight){
        canvas.width = 1080;
        canvas.height = 1920;
        container.rotation = container_indoor.rotation = container_outdoor.rotation = 90;
        container.x = container_indoor.x = container_outdoor.x = 1080
    }
};adjust_screen();

/*var box_close_img = new Image();
box_close_img.src = "img/indoor.png";
var t;
box_close_img.onload = function (){
    t = new createjs.Bitmap(this);
    //t.x = stageWidth/2;t.y = stageHeight/2;
    container.addChild(t);
    stage.update();
};*/

var state = [0, 0, 0, 0, 0, 0];
var things = [];//ticket2 ticket1 letter letter1 letter2 sand grass tele
var rects = [];//diary 
function f(){};
var outdoor = new Image();
outdoor.src = "img/outdoor.jpg";
var bg;
outdoor.onload = function() {
    bg = container.addChild(new createjs.Bitmap(this)).set({alpha:0.01});
    bg.addEventListener("click", f);
}

container.addEventListener("click", function(event) {
    console.log(stage.mouseX, stage.mouseY);
})

var queue = new createjs.LoadQueue();
queue.on("complete", handleComplete, this);
queue.loadManifest([
    {id: "aircraft", src:"img/aircraft.png"},
    {id: "diary1", src:"img/diary1.png"},
    {id: "diary2", src:"img/diary2.png"},
    {id: "diary3", src:"img/diary3.png"},
    {id: "grass", src:"img/grass.png"},
    {id: "indoor", src:"img/indoor.png"},
    {id: "letter", src:"img/letter.png"},
    {id: "letter1", src:"img/letter1.png"},
    {id: "letter2", src:"img/letter2.png"},
    {id: "newspaper", src:"img/newspaper.jpeg"},
    {id: "sand", src:"img/sand.png"},
    {id: "shelter", src:"img/shelter.jpg"},
    {id: "telescope", src:"img/tele.png"},
    {id: "ticket1", src:"img/ticket1.png"},
    {id: "ticket2", src:"img/ticket2.png"}
]);
function handleComplete() {
    container.addChild(new createjs.Bitmap(queue.getResult("indoor")));

    container.addChild(rects[0]);

    things.push(container.addChild(new createjs.Bitmap(queue.getResult("ticket2"))).set({x:1371, y:600, scaleX:0.05, scaleY:0.05, rotation:90}));
    things.push(container.addChild(new createjs.Bitmap(queue.getResult("ticket1"))).set({x:1355, y:600, scaleX:0.05, scaleY:0.05, rotation:100}));
    things.push(container.addChild(new createjs.Bitmap(queue.getResult("letter"))).set({x:1187, y:570, scaleX:0.45, scaleY:0.45}));
    things.push(new createjs.Bitmap(queue.getResult("letter1")).set({x:things[0].x, y:things[0].y, scaleX:0.03, scaleY:0.03}));
    things.push(new createjs.Bitmap(queue.getResult("letter2")).set({x:things[0].x, y:things[0].y, scaleX:0.03, scaleY:0.03}));
    things.push(container.addChild(new createjs.Bitmap(queue.getResult("sand"))).set({x:1450, y:550, scaleX:0.75, scaleY:0.75}));
    things.push(container.addChild(new createjs.Bitmap(queue.getResult("grass"))).set({x:1430, y:795, scaleX:0.7, scaleY:0.7}));
    things.push(container.addChild(new createjs.Bitmap(queue.getResult("telescope"))).set({x:1190, y:435, scaleX:0.12, scaleY:0.12}));

    things[0].addEventListener("click", ticket2_handler);
    things[1].addEventListener("click", ticket1_handler);
    things[2].addEventListener("click", letter_handler);
    things[3].addEventListener("click", letterx_handler);
    things[4].addEventListener("click", letterx_handler);
    things[5].addEventListener("click", sand_handler);
    things[6].addEventListener("click", grass_handler);
    things[7].addEventListener("click", tele_handler);
}

function draw_rects() {
    rects.push(new createjs.Shape());
    rects[0].graphics.beginFill("#ff0000");
    rects[0].graphics.drawRect(0, 0, 220, 130);
    rects[0].x = 935;
    rects[0].y = 537;
    rects[0].rotation = 35;
    rects[0].alpha = 0.01;
    rects[0].addEventListener("click", diary_handler1);
};draw_rects();

function ticket1_handler() {
    if(things[1].scaleX != 0.4) {
        container.addChild(bg);
        createjs.Tween.get(things[1]).to({rotation:0}).to({x:480, y:-50, scaleX:0.4, scaleY:0.4}, 1000);
        container.removeChild(things[1]);
        container.addChild(things[1]);
    }
    else {
        createjs.Tween.get(things[1]).to({x:1800, y:200, scaleX:0.04, scaleY:0.04}, 1000);
        container.removeChild(bg);
    }
}

function ticket2_handler() {
    if(things[0].scaleX != 0.4) {
        container.addChild(bg);
        createjs.Tween.get(things[0]).to({rotation:0}).to({x:480, y:-50, scaleX:0.4, scaleY:0.4}, 1000);
        container.removeChild(things[0]);
        container.addChild(things[0]);
    }
    else {
        createjs.Tween.get(things[0]).to({x:1800, y:330, scaleX:0.04, scaleY:0.04}, 1000);
        container.removeChild(bg);
    }
}

function letter_handler() {
    container.removeChild(things[2]);
    container.addChild(bg);
    container.addChild(things[3]);
    container.addChild(things[4]);
    createjs.Tween.get(things[3]).to({x:0, y:100, scaleX:0.3, scaleY:0.3}, 1000);
    createjs.Tween.get(things[4]).to({x:930, y:100, scaleX:0.3, scaleY:0.3}, 1000);
}

function letterx_handler() {
    createjs.Tween.get(things[3]).to({x:1800, y:100, scaleX:0.03, scaleY:0.03}, 1000);
    createjs.Tween.get(things[4]).to({x:1800, y:100, scaleX:0.03, scaleY:0.03}, 1000).call(function(){
        container.removeChild(things[3]);
        container.removeChild(things[4]);
        container.removeChild(bg);
        things[2].set({x:1800, y:100, scaleX:0.2, scaleY:0.2});
        container.addChild(things[2]);
    });
}

function sand_handler() {
    things[5].removeEventListener("click", arguments.callee);
    createjs.Tween.get(things[5]).to({x:1775, y:460, scaleX:0.15, scaleY:0.15}, 1000);
}
function grass_handler() {
    things[6].removeEventListener("click", arguments.callee);
    createjs.Tween.get(things[6]).to({x:1800, y:580, scaleX:0.2, scaleY:0.2}, 1000);
}
function tele_handler() {
    things[7].removeEventListener("click", arguments.callee);
    createjs.Tween.get(things[7]).to({x:1790, y:700, scaleX:0.11, scaleY:0.11}, 1000);
}

function diary_handler1() {
    //things.push()
}