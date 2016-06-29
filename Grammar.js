GrammarModule = function(DNA) {
    var $$ = this;

    $$.Grammar = function(size, spec) {
        this.size = size;
        this.spec = spec;  // dictionary from opcode names to lists of arguments
    };

    $$.Grammar.prototype.mutate = function(dna) {
        var newCode = dna.dna.slice(0);
        var ix = Math.floor(Math.random() * newCode.length);
        var newOpcode = newCode[ix].slice(0);
        var posn = Math.floor(Math.random() * newOpcode.length);
        if (posn == 0) {
            newCode[ix] = this.randomOpcode();
        }
        else {
            newOpcode[posn] = this.spec[newOpcode[0]][posn-1](this);
            newCode[ix] = newOpcode;
        }
        return new DNA.DNA(newCode);
    };

    $$.Grammar.prototype.randomOpcode = function() {
        var keys = Object.keys(this.spec);
        var opcode = keys[Math.floor(Math.random()*keys.length)];
        var opspec = this.spec[opcode];
        var ret = [opcode];
        for (var i = 0; i < opspec.length; i++) {
            ret[i+1] = opspec[i](this);
        }
        return ret;
    };

    $$.Grammar.prototype.randomDNA = function() {
        var code = [];
        for (var i = 0; i < this.size; i++) {
            code[i] = this.randomOpcode();
        }
        return new DNA.DNA(code);
    };

    $$.label = function(grammar) {
        return Math.floor(Math.random() * grammar.size);
    };

    $$.range = function(min, max) {
        return function(grammar) {
            return Math.floor(Math.random() * (max-min) + min);
        };
    };
};