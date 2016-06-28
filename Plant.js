PlantModule = function() {

var $$ = this;

$$.Plant = function(x, y, code) {
    this.x = x;
    this.y = y;
    this.code = code;
};

$$.Plant.prototype.run = function(field) {
    this.interp(this.code.code[this.code.startIndex], field);
};

$$.Plant.prototype.interp = function(code, field) {
    var grow = function(dx, dy) {
        field.put(new $$.Plant(this.x + dx, this.y + dy, this.code));
    };

    switch (code[0]) {
        case 'GrowUp':
            grow(0, -1);
            break;
        case 'GrowDown':
            grow(0, 1);
            break;
        case 'GrowLeft':
            grow(-1, 0);
            break;
        case 'GrowRight':
            grow(1, 0);
            break;
        default:
            throw('Undefined opcode: ' + code[0]);
    }
};

// randomOpcode : (-> Sexp) -> Sexp
$$.randomOpcode = function(over) {
    var s = Math.floor(Math.random()*4);
    switch (s) {
        case 0: return [ 'GrowUp' ];
        case 1: return [ 'GrowDown' ];
        case 2: return [ 'GrowLeft' ];
        case 3: return [ 'GrowRight' ];
        default: throw('Impossible case: ' + s);
    }
};

};
