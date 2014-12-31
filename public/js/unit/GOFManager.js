/**
 * @author       adoankim <adoankim@alumnos.uvigo.es>
 * @copyright    2014 adoankim
 * @license      {@link https://github.com/adoankim/PhaserGoF/blob/master/LICENSE|MIT License}
 * 
 * GOFManager.js
 */
function GOFManager(DirectedGraph, xBound, yBound){
    var GOFManagerClass = function(){
        this.aliveCells = [];
        this.currentGeneration = new DirectedGraph();
    }
    
    /**
     * Method that allows the cell insertion to GoF map
     * @param pos position representation
     * @return object {x, y}
     */
    GOFManagerClass.prototype.addCell = function(pos){
        var vertex = pos.x + '-' + pos.y;
        __addCell(this.aliveCells, this.currentGeneration, vertex);
        return pos;
    }
    
    /**
     * Method that checks if a given cell is alive or dead
     * @param pos position representation
     * @return boolean
     */
    GOFManagerClass.prototype.checkCell = function(pos){
        return this.aliveCells.indexOf(pos.x + '-' + pos.y) != -1;
    }
    
    /**
     * Method that returns the list living cells 
     * @return Array of Cells [{x, y}, ..., {x, y}]
     */
    GOFManagerClass.prototype.getLivingCells = function(){
        return this.aliveCells.map(cellFormatTransform);
    }

    /**
     * Method that calculate the next generation of living cells
     * - Firstly it builds the DirectedGraph representation
     * - Secondly it checks the rules over the current GoF map
     * - Finally it transforms the alive cells to the original cell representation.
     * 
     * @return Array of objects {x,y}
     */
    GOFManagerClass.prototype.calculateNextGeneration = function(){
        var cell;
        var self = this;
        this.aliveCells.forEach(function(val){
            cell = val.split('-').map(function(v){ return parseInt(v);});
            calculateEdgesAndAddToGraph(self, cell);
        });
        
        applyRulesToCells(this)
    
        return this.aliveCells.map(cellFormatTransform);
    }
    
    // PRIVATE METHODS BELOW
    
    /**
     * Transforming method that passes a 'x-y' string format to an 
     * object representation {x, y}
     * @param val cell label
     * @return object {x, y}
     */
    function cellFormatTransform(val){
            var pos = val.split('-')
            return {'x' : parseInt(pos[0]), 'y' : parseInt(pos[1])};
    }
    
    /**
     * Privated method that adds the vertex to the given list and DirectedGraph instance
     * @param aliveStack list with positions
     * @param graph DirectedGraph instance
     * @param vertex position label
     */
    function __addCell(aliveStack, graph, vertex){
        aliveStack.push(vertex);
        graph.addVertex(vertex);
    }
    
    /**
     * Privated method that check the alive/dead cell rules to the GoF map
     * @TODO optimize the ressource consumption of the next generation built process 
     *       reusing the variables from the current generation.
     * @param self reference to the current instance
     */
    function applyRulesToCells(self){
        var inbound;
        var nextGenAlives = [];
        var nextGenGraph = new DirectedGraph();
        var vertices = self.currentGeneration.getVertices();
        vertices.forEach(function(val){
           inbound = self.currentGeneration.getInboundGrade(val);
           if(inbound == 3){
               __addCell(nextGenAlives, nextGenGraph, val);
           }
           
           if(self.aliveCells.indexOf(val) != -1 && inbound == 2){
               __addCell(nextGenAlives, nextGenGraph, val);
           }
        });
        
        self.aliveCells = nextGenAlives;
        self.currentGeneration = nextGenGraph;
    }
    
    /**
     * Privated method that calculates the neighbours of a given cell 
     * based on their current position
     * @param self reference to the current instance
     * @param cell [x, y]
     */
    function calculateEdgesAndAddToGraph(self, cell){
    
        if(cell[0] - 1 >= 0){
            addConnectedNeighbour(self, cell, [cell[0] - 1, cell[1]]);
            checkYBound(self, cell, -1);
        }
        
        if(cell[0] + 1 < xBound){
            addConnectedNeighbour(self, cell, [cell[0] + 1, cell[1]]);
            checkYBound(self, cell, 1);
        }
        
        checkYBound(self, cell, 0);
    }

    
    
    /**
     * Privated method that control the neighbour connection cells at the bounds 
     * in Y axis.
     * @param self reference to the current instance
     * @param cell [x, y]
     * @param modifier integer that moves the point in X axis
     */
    function checkYBound(self, cell, modifier){
        if(cell[1] - 1 >= 0){
            addConnectedNeighbour(self, 
                cell, 
                [cell[0] + modifier, cell[1] - 1]);
        }
        
        if(cell[1] + 1 < yBound){
            addConnectedNeighbour(self, 
                cell, 
                [cell[0] + modifier, cell[1] + 1]);
        }
    }

    /**
     * Privated method that connects to neighbours in a dash-separated 
     * coordinates representation
     * @param cellA [x, y]
     * @param cellB [x, y]
     * @param modifier integer that moves the point in X axis
     */
    function addConnectedNeighbour(self, cellA, cellB){
        self.currentGeneration.addEdge(
                cellA.join("-"), 
                cellB.join("-"));
    }
    
    
    return new GOFManagerClass();
}





//define module export
if(typeof(define) === 'function'){
    define(['unit/DirectedGraph'], function (DirectedGraph) {
        return {
            getInstance: function (xBound, yBound) {
                return new GOFManager(DirectedGraph.getClass, xBound, yBound);
            }
        };
    });

}else{
    //for testing purposes
    module.exports = function(xBound, yBound){
        var DirectedGraph = require('./DirectedGraph.js');
        return new GOFManager(DirectedGraph, xBound, yBound);
    }
}
