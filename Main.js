MainModule = function(deps) {

    var $$ = this;

    var DNA = deps['DNA'];
    var Grammar = deps['Grammar'];
    var Field = deps['Field'];
    var Plant = deps['Plant'];

    $$.Main = function (window, canvas, pause) {
        this.window = window;
        this.field = new Field.Field(canvas);
        this.pause = pause;

        var field = this.field;
    };

    $$.Main.prototype.mainLoop = function () {
        var self = this;
        var frameLoop = function () {
            if (!self.pause.prop('checked')) {
                self.frame();
            }
            window.requestAnimationFrame(frameLoop);
        };
        window.requestAnimationFrame(frameLoop);
    };

    $$.Main.prototype.frame = function () {
        var self = this;
        var newIx = self.field.randomIndex();
        var dna = Plant.grammar.randomDNA();
        var plant = new Plant.Plant(newIx[0], newIx[1], dna, [255, 210, 150], 0);
        self.field.put(plant);

        for (var i = 0; i < 20000; i++) {
            var x = Math.floor(Math.random() * self.field.width);
            var y = Math.floor(Math.random() * self.field.height);

            var action = self.field.dequeueAction();
            if (action) {
                x = action[0];
                y = action[1];
            }

            var life = self.field.get(x, y);
            if (life) {
                life.run(self.field);
            }
        }
    };
};
