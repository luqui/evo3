DNAModule = function() {

var $$ = this;

// The representation for a DNA is an array of commands, where
// each command is an S-expression over free variables of the form
// ['LABEL', n], where n is an index back into the array.

$$.DNA = function(code, startIndex) {
    this.code = code;
    this.startIndex = startIndex;
};

// randomDNA : Int x ((-> Sexp) -> Sexp) -> Sexp
$$.randomDNA = function(size, genOpcode) {
    var randomLabel = function() {
        return [ 'LABEL', Math.floor(Math.random() * size) ];
    };

    var code = new Array(size);
    for (var i = 0; i < size; i++) {
        code[i] = genOpcode(randomLabel);
    }
    return new $$.DNA(code, Math.floor(Math.random() * size));
};

};
