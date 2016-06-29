MainModule = function(deps) {

var $$ = this;

var DNA = deps['DNA'];
var Field = deps['Field'];
var Plant = deps['Plant'];

$$.Main = function(window, canvas, pause) {
    this.window = window;
    this.field = new Field.Field(canvas);
    this.pause = pause;

    var field = this.field;

    this.mouseActive = false;
    this.mouseX = 0;
    this.mouseY = 0;

    var self = this;
    var updateMouse = function(e) {
        var bound = canvas.getBoundingClientRect();
        self.mouseX = e.clientX - bound.left;
        self.mouseY = e.clientY - bound.top;
        self.mouseActive = true;
    };
    canvas.addEventListener('mousemove', updateMouse, false);
    canvas.addEventListener('mouseleave', function(e) { self.mouseActive = false }, false)
};

$$.Main.prototype.mainLoop = function() {
    var self = this;
    var frameLoop = function() {
        if (!self.pause.prop('checked')) {
            self.frame();
        }
        window.requestAnimationFrame(frameLoop);
    };
    window.requestAnimationFrame(frameLoop);
};

$$.Main.prototype.frame = function() {
    var newIx = this.field.randomIndex();
    var dna = DNA.randomDNA(64, Plant.randomOpcode);
    var plant = new Plant.Plant(newIx[0], newIx[1], dna, [255, 210, 150], dna.randomIndex());
    this.field.put(plant);


    for (var i = 0; i < 100; i++) {
        var x = Math.floor(Math.random() * this.field.width);
        var y = Math.floor(Math.random() * this.field.height);
        var life = this.field.get(x, y);
        if (life) {
            life.run(this.field);
        }
    }

    if (this.mouseActive) {
        var spiritOfTheForestRadius = 25;
        for (var i = 0; i < 100; i++) {
            var x0 = this.mouseX;
            var y0 = this.mouseY;
            var x = x0 + Math.floor(Math.random() * 2 * spiritOfTheForestRadius) - spiritOfTheForestRadius;
            var y = y0 + Math.floor(Math.random() * 2 * spiritOfTheForestRadius) - spiritOfTheForestRadius;
            var life = this.field.get(x, y);
            if (life) {
                life.run(this.field);
            }
        }
    }
};

};
