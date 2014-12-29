/**
 * @author       adoankim <adoankim@alumnos.uvigo.es>
 * @copyright    2014 adoankim
 * @license      {@link https://github.com/adoankim/PhaserGoF/blob/master/LICENSE|MIT License}
 * 
 * Graph.js
 */


function DirectedGraph(_){
    var DirectedGraphClass = function(){
        this.edges = {};
        this.vertices = []; 
    }

    /**
     * Method that adds a vertex to the vertices list and initialize its 
     * outbound edge list
     * @param v new vertex
     * @return added vertex
     */
    DirectedGraphClass.prototype.addVertex = function(v){
        if(this.vertices.indexOf(v) == -1){
            this.vertices.push(v);
            this.edges[v] = [];
        }
        return v;
    }
    
    /**
     * Retrieve the vertices list of the graph
     * @return graph vertices
     */
    DirectedGraphClass.prototype.getVertices = function(){
        return this.vertices;
    }
    
    /**
     * Adds an edge between two given vertices, it adds the vertices to the list
     * if they doesn't exist.
     * @param v from vertex
     * @param w to vertex
     * @return a pair with the given vertices
     */
    DirectedGraphClass.prototype.addEdge = function(v, w){
        this.addVertex(v);
        this.addVertex(w);
        if(_.keys(this.edges[v]).indexOf(w) == -1){
            this.edges[v].push(w);
        }
        return [v, w];
    }

    /**
     * Retrieve the end list vertices conected to the given vertex 
     * @param v source vertex
     * @return vertex list
     */
    DirectedGraphClass.prototype.getEdges = function(v){
        return this.edges[v];
    }
    
    /**
     * Returns the inbound grade from a given vertex
     * @param v vertex
     * @return int
     */
    DirectedGraphClass.prototype.getInboundGrade = function(v){
        var neighboursEdges = _.flatten(_.values(_.omit(this.edges, v)));
        return _.filter(neighboursEdges, function(x){ return x == v; }).length;
    }
    
    return new DirectedGraphClass();
}

//define module export
if(typeof(define) === 'function'){
    define(['underscore'], function (_) {
        return {
            getClass: function () {
                return new DirectedGraph(_);
            }
        };
    });
}

//for testing purposes
module.exports = function(){
    var _ = require('underscore');
    return new DirectedGraph(_);
}