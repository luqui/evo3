PlantModule = function(Grammar) {

    var $$ = this;

    $$.Plant = function (x, y, code, color, startIndex) {
        this.x = x;
        this.y = y;
        this.code = code;
        this.color = color;
        this.startIndex = startIndex;
        this.power = 0;
    };

    $$.Plant.prototype.run = function (field) {
        this.interp(this.code.code[this.startIndex], field);
    };

    $$.Plant.prototype.interp = function (code, field) {
        var self = this;
        var grow = function (dx, dy, index) {
            var target = field.get(self.x + dx, self.y + dy);
            if (!target || self.power > target.power) {
                field.put(new $$.Plant(self.x + dx, self.y + dy, self.code, self.color, index));
            }
        };

        switch (code[0]) {
            case 'GrowUp':
                grow(0, -1, code[1]);
                this.startIndex = code[2];
                break;
            case 'GrowDown':
                grow(0, 1, code[1]);
                this.startIndex = code[2];
                break;
            case 'GrowLeft':
                grow(-1, 0, code[1]);
                this.startIndex = code[2];
                break;
            case 'GrowRight':
                grow(1, 0, code[1]);
                this.startIndex = code[2];
                break;
            case 'SetColor':
                this.color = [code[1], code[2], code[3]];
                this.startIndex = code[4];
                field.put(this);
                break;
            case 'IncreasePower':
                this.power += 1;
                this.startindex = code[1];
                break;
            default:
                throw('Undefined opcode: ' + code[0]);
        }
    };

    $$.grammar = new Grammar.Grammar(64, {
        GrowUp: [Grammar.label, Grammar.label],
        GrowDown: [Grammar.label, Grammar.label],
        GrowLeft: [Grammar.label, Grammar.label],
        GrowRight: [Grammar.label, Grammar.label],
        SetColor: [Grammar.range(0,256), Grammar.range(0,256), Grammar.range(0,256), Grammar.label],
        IncreasePower: [Grammar.label],
    });
};
