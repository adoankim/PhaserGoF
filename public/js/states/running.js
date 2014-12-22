/**
 * running.js
 * Running game state 
 */
 
var RunningState = function(){

    var RunningStateClass = function(){
        
    }
    
    RunningStateClass.prototype.preload = function(){}
    
    RunningStateClass.prototype.create = function(){
        this.game.stage.backgroundColor = '#FAED95'
        var self = this;
        require(['js/utils/polygons.js'], function(polygons){
            self.Polygons = polygons.getInstance();
            drawGrid(self)
        })
    }
    
    RunningStateClass.prototype.update = function(){
        
    }

    
    /**
     * Privated method that draws a parallel lines from to a given direction
     * @param self context object
     * @param params {step, style : {lineWidth, color}, bound}
     * @param getDrawDirectionParams function(updatedStep)
     */
    function drawGridDirection(self, params, getDrawDirectionParams){
        var dirStep = params.step
        var style = params.style
        while(dirStep < params.bound){
            var dirParams = getDrawDirectionParams(dirStep)
            self.Polygons.drawLine(self.grid.ctx, dirParams.from, dirParams.to, style)
            dirStep += params.step
        }
    }
    
    /**
     * Privated method that draws a Grid into the canvas based on its height and width
     * @param self context object
     */
    function drawGrid(self){
        
        self.grid = self.game.add.bitmapData(self.game.stage.width, self.game.stage.height)
        self.game.add.sprite(0, 0, self.grid)
       
        var style = {'lineWidth' : 0.5, 'color' : '#FCDB73'}
       
        //First we draw Y direction
        var paramY = {'step' : 10, 'style' : style, 'bound' : self.game.stage.height};
        drawGridDirection(self, paramY, function(step){
            return { 
                'from' : {'x' : 0, 'y' : step},
                'to' : {'x' : self.game.stage.width, 'y' : step}
            }
        })
        
        //Then we draw X direction
        var paramX = {'step' : 10, 'style' : style, 'bound' : self.game.stage.width};
        drawGridDirection(self, paramX, function(step){
            return { 
                'from' : {'x' : step, 'y' : 0},
                'to' : {'x' : step, 'y' : self.stage.height}
            }
        })
        

    }

    return new RunningStateClass();
}

//define module export
define(function () {
    return {
        getState: function () {
            return new RunningState();
        }
    };
});