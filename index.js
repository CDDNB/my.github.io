var img = document.getElementById('intro');
img.addEventListener("click", function(){
    img.alpha = 0;
    //alert("???");
});

var stage = new createjs.Stage("wrapper");
var Rect = new createjs.Shape();
var rect = new createjs.Shape();
Rect.graphics.beginFill("#ff0000");
Rect.graphics.drawEllipse(0, 0, 500, 300);
Rect.graphics.endFill();
rect.graphics.beginFill("#00ff00");
rect.graphics.drawRect(stageWidth, 100, 100, 100);
rect.graphics.endFill();
stage.addChild(Rect);
stage.addChild(rect);
stage.update();



Rect.addEventListener("click", function() {
    stage.removeChild(Rect);
});

rect.addEventListener("click", function() {
    stage.removeChild(rect);
})


//createjs.Tween.get(Rect).wait(500).to({alpha:0}, 1000);
createjs.Ticker.addEventListener("tick", function() {
    
    stage.update();
});

createjs.Tween.get(img).wait(500).to({alpha: 0}, 1000);