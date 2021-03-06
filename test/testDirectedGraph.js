/**
 * @author       adoankim <adoankim@alumnos.uvigo.es>
 * @copyright    2014 adoankim
 * @license      {@link https://github.com/adoankim/PhaserGoF/blob/master/LICENSE|MIT License}
 * 
 * testCell.js
 */

var chai = require('chai');
var assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); 
var DirectedGraph = require('../public/js/unit/DirectedGraph.js');


describe('DirectedGraph', function(){
    describe('#addVertex(v)', function(){
        var g = new DirectedGraph();
        it('should permit to add a vertex to the graph', function(){
          var v = 'v';
          var newVertex = g.addVertex(v);
          newVertex.should.equal(v);
        })
    })
    
    describe('#hasVertex(v)', function(){
        var g = new DirectedGraph();
        it('should permit to check if a given labeled vertex exist on the graph', function(){
          var v = 'v';
          g.addVertex(v);
          var vertexExist = g.hasVertex(v);
          expect(vertexExist).to.be.ok;
        })
    })
    
    describe('#getVertices()', function(){
        var g = new DirectedGraph();
        it('should return graph vertices', function(){
            var v1 = 'a';
            var v2 = 'b';
            var v3 = 'c';
            
            g.addVertex(v1);
            g.addVertex(v2);
            g.addVertex(v3);
            
            var vertices = g.getVertices();
            vertices.should.deep.equal([v1, v2, v3]);
        })
    })
    
    describe('#addEdge(v, w)', function(){
        var g = new DirectedGraph();
        it('should add an edge between two given vertices', function(){
            var v1 = 'a';
            var v2 = 'b';
            var v3 = 'c';
            g.addVertex(v1);
            g.addVertex(v2);
            
            var e1 = g.addEdge(v1, v2);
            var e2 = g.addEdge(v1, v3);
            
            e1.should.deep.equal([v1, v2]);
            e2.should.deep.equal([v1, v3]);            

        })
    })
    
    describe('#getEdges(v)', function(){
        var g = new DirectedGraph();
        it('should return the outbound edges from a given vertex', function(){
            var v1 = 'a';
            var v2 = 'b';
            var v3 = 'c';
            
            g.addEdge(v1, v2);
            g.addEdge(v1, v3);
            var edges = g.getEdges(v1);
            
            edges.should.deep.equal([v2, v3]);

        })
    })
    
    
    
    describe('#getInboundGrade(v)', function(){
        var g = new DirectedGraph();
        it('should return the inbound grade of a given vertex', function(){
            var v1 = 'a';
            var v2 = 'b';
            var v3 = 'c';
            
            g.addEdge(v2, v1);
            g.addEdge(v3, v1);
            var v1InboundGrade= g.getInboundGrade(v1);
            
            v1InboundGrade.should.equal(2);

        })
    })
    


  
})
