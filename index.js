function showLove(){
    this.__init();
}

var p = showLove.prototype;

p.__init = function (){
    var _this = this;
    _this.__initDatas();
    _this.__initStage();
    var time = setInterval(function () {
        _this.__initImage();
        _this.index++;
        if(_this.index == 5){
            clearInterval(time);
        }
    },2000)
};

p.__initDatas = function () {
    this.canvas;
    this.stage;
    this.img;
    this.bmp;
    this.h;
    this.w;
    this.index = 0;
};

p.__initStage = function () {
    var _this = this;
    _this.canvas = document.getElementById("canvas");
    _this.canvas.width = window.innerWidth;
    _this.canvas.height = window.innerHeight;
    _this.stage = new createjs.Stage(_this.canvas);
};

p.__initImage = function () {
    var _this = this;
    _this.img = new Image();
    _this.img.src = "1.jpg";
    _this.img.addEventListener('load',_this.handleImageLoad.bind(_this));
};

p.handleImageLoad = function () {
    var _this = this;
    _this.w = _this.canvas.width;
    _this.h = _this.canvas.height;

    var heart = _this.initHeart();
    heart.scaleX = heart.scaleY = 5;
    heart.x = heart.y = 100;
    _this.bmp = new createjs.Bitmap(_this.img);
    _this.bmp.mask = heart;

    var con = new createjs.Container();
    con.addChild(heart,_this.bmp);
    con.x = _this.w/2-_this.img.width/2;
    con.y = -200;
    con.cache(0,0,_this.w,_this.h);

    _this.stage.addChild(con);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.removeAllEventListeners();
    createjs.Ticker.addEventListener("tick", _this.tick.bind(_this));
    _this.stage.update();
};


p.initHeart = function () {
    var heart = new createjs.Shape();
    heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30));
    heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
    heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);

    return heart;
};

p.tick = function () {
    var _this = this;

    for(var i = 0 ; i < _this.index ; i++){
        var heart = _this.stage.getChildAt(i);
        if (heart.y <= -180) {
            heart._x = Math.random() * _this.w;
            heart.y = _this.h * (1 + Math.random()) + 50;
            heart.perX = (1 + Math.random() * 2) * _this.h;
            heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
            heart.offX = Math.random() * _this.h;
            heart.velY = -Math.random() * 2 - 1;
            heart._rotation = Math.random() * 40 - 20;
            heart.compositeOperation = Math.random() < 0.33 ? "lighter" : "source-over";
        }
        var int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
        heart.y -= Math.random()*2 +1;
        heart.x = heart._x + Math.cos(int) * heart.ampX;
        heart.rotation = heart._rotation + Math.sin(int) * 30;
        heart.updateCache("source-over");
    }

    _this.stage.update();
};

window.onload = function () {
    new showLove();
};

