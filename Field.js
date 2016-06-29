FieldModule = function() {

    var $$ = this;
    var MAXENERGY = 50;

    $$.Field = function (canvas) {
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.grid = new Array(this.width);
        this.actionQueue = [];
        this.actionQueueRev = [];
        for (var x = 0; x < this.width; x++) {
            this.grid[x] = new Array(this.height);
            for (var y = 0; y < this.height; y++) {
                this.grid[x][y] = {
                    value: null,
                    energy: 0,
                };
            }
        }
    };

    $$.Field.prototype.inRange = function (x, y) {
        return 0 <= x && x < this.width && 0 <= y && y < this.height;
    };

    $$.Field.prototype.put = function (obj) {
        if (this.inRange(obj.x, obj.y)) {
            this.grid[obj.x][obj.y].value = obj;
            this.ctx.fillStyle = 'rgb(' + obj.color[0] + ',' + obj.color[1] + ',' + obj.color[2] + ')';
            this.ctx.fillRect(obj.x, obj.y, 1, 1);
        }
    };

    $$.Field.prototype.del = function (x, y) {
        if (this.inRange(x, y)) {
            this.grid[x][y].value = null;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillRect(x, y, 1, 1);
        }
    };

    $$.Field.prototype.get = function (x, y) {
        if (this.inRange(x, y)) {
            return this.grid[x][y].value;
        }
        else {
            return null;
        }
    };

    $$.Field.prototype.takeEnergy = function(x, y) {
        if (this.inRange(x,y)) {
            var e = this.grid[x][y].energy;
            this.grid[x][y].energy = 0;
            if (this.grid[x][y].value == null) {
                this.ctx.fillStyle = 'rgb(255,255,255)';
                this.ctx.fillRect(x,y,1,1);
            }
            return e;
        }
        else
        {
            return 0;
        }
    };

    $$.Field.prototype.putEnergy = function(x, y, e) {
        if (this.inRange(x,y)) {
            var cell = this.grid[x][y];
            cell.energy += e;
            if (cell.energy > MAXENERGY) {
                cell.energy = MAXENERGY;
            }
            if (cell.value == null) {
                this.ctx.fillStyle = 'rgb(' + (255-5*cell.energy) + ',255,255)';
                this.ctx.fillRect(x,y,1,1);
            }
        }
    };

    $$.Field.prototype.enqueueAction = function(x, y) {
        if (this.inRange(x,y)) {
            this.actionQueue.push([x,y]);
        }
    };

    $$.Field.prototype.dequeueAction = function() {
        if (this.actionQueueRev.length == 0) {
            this.actionQueueRev = this.actionQueue;
            this.actionQueueRev.reverse();
            this.actionQueue = [];
        }
        return this.actionQueueRev.pop() || null;
    };

    $$.Field.prototype.randomIndex = function () {
        return [
            Math.floor(Math.random() * this.width),
            Math.floor(Math.random() * this.height),
        ];
    };

};
