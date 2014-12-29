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



describe('GOFManager', function(){
    
    describe('#addCell(pos)', function(){
        it('should permit to add a cell in a given position', function(){
            assert.fail();
        })
    })
    
    describe('#checkCell(pos)', function(){
        it('should return if a cell is alive or not', function(){
            assert.fail();
        })
    })
    
    
    describe('#calculateNextGeneration()', function(){

        it('Any live cell with fewer than two live neighbours dies', function(){
            assert.fail();
        });
    
        it('Any live cell with more than three live neighbours dies', function(){
            assert.fail()
        });
        
        it('Any live cell with two or three live neighbours lives', function(){
            assert.fail()
        });
        
        it('Any dead cell with exactly three live neighbours becomes a live cell', function(){
            assert.fail()
        });
    })

  
})
