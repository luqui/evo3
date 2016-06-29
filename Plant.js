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
        var grow = function (dx, dy, dna, index) {
            var target = field.get(self.x + dx, self.y + dy);
            if (!target) {
                field.put(new $$.Plant(self.x + dx, self.y + dy, dna, self.color, index));
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
        };

        var dir, targetDir, target;
        switch (code[0]) {
            case 'Grow':
                dir = directionToD(code[1]);
                grow(dir[0], dir[1], this.dna, code[2]);
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
            case 'HaveSex':
                dir = directionToD(code[1]);
                targetDir = directionToD(code[2]);
                target = field.get(this.x + targetDir[0], this.y + targetDir[1]);
                if (target) {
                    grow(dir[0], dir[1], $$.grammar.sex(this.dna, target.dna), code[3]);
                }
                this.startIndex = code[4];
                break;
            case 'CmpColor':
                dir = directionToD(code[1]);
                target = field.get(this.x + dir[0], this.y + dir[1]);
                if (!target) {
                    this.startIndex = code[2];
                }
                else if (this.color[0] == target.color[0] &&
                    this.color[1] == target.color[1] &&
                    this.color[2] == target.color[2]) {
                    this.startIndex = code[3];
                }
                else {
                    this.startIndex = code[4];
                }
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
        HaveSex: [Grammar.range(0,4), Grammar.range(0,4), Grammar.label, Grammar.label],
        CmpColor: [Grammar.range(0,4), Grammar.label, Grammar.label, Grammar.label],
    });
};
