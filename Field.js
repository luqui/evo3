FieldModule = function() {

var $$ = this;

$$.Field = function(canvas) {
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.grid = new Array(this.width);
    for (var x = 0; x < this.width; x++) {
        this.grid[x] = new Array(this.height);
        for (var y = 0; y < this.height; y++) {
            this.grid[x][y] = null;
        }
    }
};

$$.Field.prototype.inRange = function(x,y) {
    return 0 <= x && x < this.width && 0 <= y && y < this.height;
};

$$.Field.prototype.put = function(obj) {
    if (this.inRange(obj.x, obj.y)) {
        this.grid[obj.x][obj.y] = obj;
        this.ctx.fillStyle = 'rgb(' + obj.color[0] + ',' + obj.color[1] + ',' + obj.color[2] + ')';
        this.ctx.fillRect(obj.x, obj.y, 1, 1);
    }
};

$$.Field.prototype.del = function(x,y) {
    if (this.inRange(x,y)) {
        this.grid[x][y] = null;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(x, y, 1, 1);
    }
};

$$.Field.prototype.get = function(x,y) {
    if (this.inRange(x,y)) {
        return this.grid[x][y];
    }
    else {
        return null;
    }
};

$$.Field.prototype.randomIndex = function() {
    return [
        Math.floor(Math.random() * this.width),
        Math.floor(Math.random() *this.height),
    ];
};

};
