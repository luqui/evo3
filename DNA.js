DNAModule = function() {
    var $$ = this;


    $$.DNA = function (code) {
        this.code = code;
    };

    $$.DNA.prototype.randomIndex = function() {
        return Math.floor(Math.random() * this.code.length);
    };

    // randomDNA : Int x ((-> Sexp) -> Sexp) -> Sexp
    $$.randomDNA = function (size, genOpcode) {
        var randomLabel = function () {
            return Math.floor(Math.random() * size);
        };

        var code = new Array(size);
        for (var i = 0; i < size; i++) {
            code[i] = genOpcode(randomLabel);
        }
        return new $$.DNA(code);
    };

};
