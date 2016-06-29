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

    var activate = function(e) {
        var life = field.get(e.x - canvas.offsetLeft, e.y - canvas.offsetTop);
        if (life) {
            life.run(field);
        }
    };
    canvas.addEventListener('mousedown', activate, false);
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
    var plant = new Plant.Plant(newIx[0], newIx[1], dna, [255,210,150], dna.randomIndex());
    this.field.put(plant);

    for (var i = 0; i < 500; i++) {
        var iterIx = this.field.randomIndex();
        var life = this.field.get(iterIx[0], iterIx[1]);
        if (life) {
            life.run(this.field);
        }
    }
};

};
