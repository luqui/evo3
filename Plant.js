PlantModule = function(Grammar) {

    var $$ = this;

    $$.Plant = function (x, y, code, color, startIndex) {
        this.x = x;
        this.y = y;
        this.dna = code;
        this.color = color;
        this.startIndex = startIndex;
    };

    $$.Plant.prototype.run = function (field) {
        this.interp(this.dna.dna[this.startIndex], field);
    };

    $$.Plant.prototype.interp = function (code, field) {
        var self = this;
        var grow = function (dx, dy, index) {
            var target = field.get(self.x + dx, self.y + dy);
            if (!target || self.power > target.power) {
                field.put(new $$.Plant(self.x + dx, self.y + dy, self.dna, self.color, index));
            }
        };
        var directionToD = function(dir) {
            switch(dir) {
                case 0: return [1,0];
                case 1: return [0,-1];
                case 2: return [-1,0];
                case 3: return [0,1];
                default: throw("Invalid direction: " + dir);
            }
        }

        switch (code[0]) {
            case 'Grow':
                var dir = directionToD(code[1]);
                grow(dir[0], dir[1], code[2]);
                this.startIndex = code[3];
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
            case 'Mutate':
                this.dna = $$.grammar.mutate(this.dna);
                this.startIndex = code[1];
                break;
            default:
                throw('Undefined opcode: ' + code[0]);
        }
    };

    $$.grammar = new Grammar.Grammar(64, {
        Grow: [Grammar.range(0,4), Grammar.label, Grammar.label],
        SetColor: [Grammar.range(0,256), Grammar.range(0,256), Grammar.range(0,256), Grammar.label],
        IncreasePower: [Grammar.label],
        Mutate: [Grammar.label],
    });
};
