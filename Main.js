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

        this.mouseActive = false;
        this.mouseX = 0;
        this.mouseY = 0;

        var self = this;
        var updateMouse = function (e) {
            var bound = canvas.getBoundingClientRect();
            self.mouseX = e.clientX - bound.left;
            self.mouseY = e.clientY - bound.top;
            self.mouseActive = true;
        };
        canvas.addEventListener('mousemove', updateMouse, false);
        canvas.addEventListener('mouseleave', function (e) {
            self.mouseActive = false
        }, false)
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

        (function() {
            for (var i = 0; i < 100; i++) {
                var x = Math.floor(Math.random() * self.field.width);
                var y = Math.floor(Math.random() * self.field.height);
                var life = self.field.get(x, y);
                if (life) {
                    life.run(self.field);
                }
            }
        })();

        (function() {
            if (self.mouseActive) {
                var spiritOfTheForestRadius = 25;
                for (var i = 0; i < 100; i++) {
                    var x0 = self.mouseX;
                    var y0 = self.mouseY;
                    var r = -spiritOfTheForestRadius*Math.log(Math.random());
                    if (r == Infinity) continue;  // because log(0) might happen once in a blue moon.

                    var theta = Math.random()*2*Math.PI;
                    var x = x0 + Math.round(r*Math.cos(theta));
                    var y = y0 + Math.round(r*Math.sin(theta));
                    var life = self.field.get(x, y);
                    if (life) {
                        life.run(self.field);
                    }
                }
            }
        })();
    };
};
