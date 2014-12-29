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

var GOFManagerClass = require('../public/js/unit/GOFManager.js');


describe('GOFManager', function(){
    
    describe('#addCell(pos)', function(){
        var GOFMan = new GOFManagerClass(10, 10);
        it('should permit to add a cell in a given position', function(){
            var newCell = {'x' : 0, 'y' : 0};
            var addedCell = GOFMan.addCell(newCell);
            addedCell.should.deep.equal(newCell);
        })
    })
    
    describe('#checkCell(pos)', function(){
        var GOFMan = new GOFManagerClass(10, 20);
        it('should return if a cell is alive or not', function(){
            var cell = {'x' : 0, 'y' : 0};
            GOFMan.addCell(cell);

            var cellIsAlive = GOFMan.checkCell(cell);
            
            var cell = {'x' : 0, 'y' : 1};
            var cellIsDead = GOFMan.checkCell(cell);
            
            expect(cellIsAlive).to.be.ok;
            expect(cellIsDead).to.not.be.ok;
        })
    })
    
    
    describe('#calculateNextGeneration()', function(){
        it('Any live cell with fewer than two live neighbours dies', function(){
            var GOFMan = new GOFManagerClass(3, 3);
            var cellA = {'x' : 0, 'y' : 0};
            var cellB = {'x' : 1, 'y' : 1};
            GOFMan.addCell(cellA);
            GOFMan.addCell(cellB);
            GOFMan.calculateNextGeneration();
            
            var cellMustBeDead = GOFMan.checkCell(cellA);
            expect(cellMustBeDead).to.not.be.ok;
            
            cellMustBeDead = GOFMan.checkCell(cellB);
            expect(cellMustBeDead).to.not.be.ok;
        });
    
        it('Any live cell with more than three live neighbours dies', function(){
            var GOFMan = new GOFManagerClass(3, 3);
            var cellA = {'x' : 0, 'y' : 0};
            var cellB = {'x' : 0, 'y' : 2};
            var cellC = {'x' : 1, 'y' : 1};
            var cellD = {'x' : 0, 'y' : 2};
            var cellE = {'x' : 2, 'y' : 2};
            GOFMan.addCell(cellA);
            GOFMan.addCell(cellB);
            GOFMan.addCell(cellC);
            GOFMan.addCell(cellD);
            GOFMan.addCell(cellE);
            GOFMan.calculateNextGeneration();
            
            var cellMustBeDead = GOFMan.checkCell(cellC);
            expect(cellMustBeDead).to.not.be.ok;
            
        });
        
        it('Any live cell with two or three live neighbours lives', function(){
            var GOFMan = new GOFManagerClass(3, 3);
            var cellA = {'x' : 0, 'y' : 0};
            var cellB = {'x' : 1, 'y' : 0};
            var cellC = {'x' : 0, 'y' : 1};
            GOFMan.addCell(cellA);
            GOFMan.addCell(cellB);
            GOFMan.addCell(cellC);
            GOFMan.calculateNextGeneration();
            
            var cellMustBeAlive = GOFMan.checkCell(cellA);
            expect(cellMustBeAlive).to.be.ok;
            
        });
        
        it('Any dead cell with exactly three live neighbours becomes a live cell', function(){
            var GOFMan = new GOFManagerClass(3, 3);
            var cellA = {'x' : 0, 'y' : 0};
            var cellB = {'x' : 0, 'y' : 2};
            var cellC = {'x' : 2, 'y' : 0};
            GOFMan.addCell(cellA);
            GOFMan.addCell(cellB);
            GOFMan.addCell(cellC);
            GOFMan.calculateNextGeneration();
            
            
            var newCell = {'x' : 1, 'y' : 1};
            var cellMustBeAlive = GOFMan.checkCell(newCell);
            expect(cellMustBeAlive).to.be.ok;
            
        });
    })

  
})
