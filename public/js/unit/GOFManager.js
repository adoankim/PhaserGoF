/**
 * @author       adoankim <adoankim@alumnos.uvigo.es>
 * @copyright    2014 adoankim
 * @license      {@link https://github.com/adoankim/PhaserGoF/blob/master/LICENSE|MIT License}
 * 
 * GOFManager.js
 */
function GOFManager(DirectedGraph){
    var GOFManagerClass = function(){
    }
    
    return new GOFManagerClass();
}





//define module export
if(typeof(define) === 'function'){
    define(['unit/DirectedGraph'], function (DirectedGraph) {
        return {
            getInstance: function () {
                return new GOFManager(DirectedGraph);
            }
        };
    });

}

//for testing purposes
module.exports = function(){
    var DirectedGraph = require('./DirectedGraph.js');
    return GOFManager(DirectedGraph);
}
