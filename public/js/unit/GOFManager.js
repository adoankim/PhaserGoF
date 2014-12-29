/**
 * @author       adoankim <adoankim@alumnos.uvigo.es>
 * @copyright    2014 adoankim
 * @license      {@link https://github.com/adoankim/PhaserGoF/blob/master/LICENSE|MIT License}
 * 
 * GOFManager.js
 */
function GOFManager(Graph){
    var GOFManagerClass = function(){
    }
    
    return new GOFManagerClass();
}





//define module export
if(typeof(define) === 'function'){
    define(['unit/Graph'], function (Graph) {
        return {
            getInstance: function () {
                return new GOFManager(Graph);
            }
        };
    });

}

//for testing purposes
module.exports = function(){
    var Graph = require('./Graph.js');
    return GOFManager(Graph);
}
