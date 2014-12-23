var chai = require('chai');
var assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); 
var Cell =  require("../public/js/unit/cell.js");



describe('Cell', function(){
    describe('#getPosition()', function(){
        it('Any cell must know its position', function(){
            assert.fail()
        })
    })
    
    describe('#calculateNextGeneration()', function(){
        it('Any live cell with fewer than two live neighbours dies', function(){
            assert.fail()
        });
    
        it('Any live cell with more than three live neighbours dies', function(){
            assert.fail()
        });
        
        it('Any live cell with two or three live neighbours lives', function(){
            assert.fail()
        });
        
        it('Any dead cell with exactly three live neighbours becomes a live cell', function(){
            assert.fail()
        })
    })

  
})
