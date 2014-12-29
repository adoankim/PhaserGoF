/**
 * @author       adoankim <adoankim@alumnos.uvigo.es>
 * @copyright    2014 adoankim
 * @license      {@link https://github.com/adoankim/PhaserGoF/blob/master/LICENSE|MIT License}
 * 
 * Graph.js
 */

function Graph(_){
    var GraphClass = function(){
        this.edges = {};
        this.vertices = []; 
    }
    
    GraphClass.prototype.addVertex = function(v){
        if(this.vertices.indexOf(v) == -1){
            this.vertices.push(v);
            this.edges[v] = [];
        }
        return v;
    }
    
    GraphClass.prototype.getVertices = function(){
        return this.vertices;
    }

    GraphClass.prototype.addEdge = function(v, w){
        this.addVertex(v);
        this.addVertex(w);
        if(_.keys(this.edges[v]).indexOf(w) == -1){
            this.edges[v].push(w);
        }
        return [v, w];
    }

    GraphClass.prototype.getEdges = function(v){
        return this.edges[v];
    }
    
    GraphClass.prototype.getInboundGrade = function(v){
        var neighboursEdges = _.flatten(_.values(_.omit(this.edges, v)));
        return _.filter(neighboursEdges, function(x){ return x == v; }).length;
    }
    
    return new GraphClass();
}

//define module export
if(typeof(define) === 'function'){
    define(['underscore'], function (_) {
        return {
            getClass: function () {
                return new Graph(_);
            }
        };
    });
}

//for testing purposes
module.exports = function(){
    var _ = require('underscore');
    return new Graph(_);
}