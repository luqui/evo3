MainModule = function(deps) {

var $$ = this;

var DNA = deps['DNA'];
var Field = deps['Field'];
var Plant = deps['Plant'];

$$.Main = function(window, canvas) {
    this.window = window;
    this.field = new Field.Field(canvas);
};

$$.Main.prototype.mainLoop = function() {
    var self = this;
    var frameLoop = function() {
        self.frame();
        window.requestAnimationFrame(frameLoop);
    };
    window.requestAnimationFrame(frameLoop);
};

$$.Main.prototype.frame = function() {
    var newIx = this.field.randomIndex();
    var plant = new Plant.Plant(
        newIx[0], newIx[1],
        DNA.randomDNA(10, Plant.randomOpcode));
    this.field.put(plant);

    for (var i = 0; i < 10; i++) {
        var iterIx = this.field.randomIndex();
        var life = this.field.get(iterIx[0], iterIx[1]);
        if (life) {
            life.run(this.field);
        }
    }
};

};
