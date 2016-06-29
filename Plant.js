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
            if (!target) {
                field.put(new $$.Plant(self.x + dx, self.y + dy, self.dna, self.color, index));
            }
        };
        var attack = function(dx, dy) {
            var target = field.get(self.x + dx, self.y + dy);
            if (target) {
                field.del(self.x + dx, self.y + dy);
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

        var dir;
        switch (code[0]) {
            case 'Grow':
                dir = directionToD(code[1]);
                grow(dir[0], dir[1], code[2]);
                this.startIndex = code[3];
                break;
            case 'Attack':
                dir = directionToD(code[1]);
                attack(dir[0], dir[1]);
                this.startIndex = code[2];
                break;
            case 'SetColor':
                this.color = [code[1], code[2], code[3]];
                this.startIndex = code[4];
                field.put(this);
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
        Attack: [Grammar.range(0,4), Grammar.label],
        SetColor: [Grammar.range(0,256), Grammar.range(0,256), Grammar.range(0,256), Grammar.label],
        Mutate: [Grammar.label],
    });
};
