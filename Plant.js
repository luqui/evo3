PlantModule = function() {

var $$ = this;

$$.Plant = function(x, y, code, color, startIndex) {
    this.x = x;
    this.y = y;
    this.code = code;
    this.color = color;
    this.startIndex = startIndex;
};

$$.Plant.prototype.run = function(field) {
    this.interp(this.code.code[this.startIndex], field);
};

$$.Plant.prototype.interp = function(code, field) {
    var self = this;
    var grow = function(dx, dy, index) {
        if (!field.get(self.x + dx, self.y + dy)) {
            field.put(new $$.Plant(self.x + dx, self.y + dy, self.code, self.color, index));
        }
    };

    switch (code[0]) {
        // [Grow* <start label of child> <continuation label>]
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
        default:
            throw('Undefined opcode: ' + code[0]);
    }
};

// randomOpcode : (-> Sexp) -> Sexp
$$.randomOpcode = function(over) {
    var randn = function(n) {
        return Math.floor(Math.random() * n);
    };

    var s = Math.floor(Math.random()*5);

    switch (s) {
        case 0: return [ 'GrowUp', over(), over() ];
        case 1: return [ 'GrowDown', over(), over() ];
        case 2: return [ 'GrowLeft', over(), over() ];
        case 3: return [ 'GrowRight', over(), over() ];
        case 4: return [ 'SetColor',  randn(255), randn(255), randn(255), over() ];
        default: throw('Impossible case: ' + s);
    }
};

};
