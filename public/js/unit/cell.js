//define module export
var Cell = function(){}


if(typeof(define) === 'function'){
    define(function () {
        return {
            getState: function () {
                return 0;
            }
        };
    });
}

module.exports = Cell
