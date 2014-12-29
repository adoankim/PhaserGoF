/**
 * @author       adoankim <adoankim@alumnos.uvigo.es>
 * @copyright    2014 adoankim
 * @license      {@link https://github.com/adoankim/PhaserGoF/blob/master/LICENSE|MIT License}
 * 
 * running.js
 * Running game state 
 */
var RunningState = function(_Polygons){
    
    var RunningStateClass = function(){
        this.Polygons = _Polygons;
    };
    
    RunningStateClass.prototype.preload = function(){};
    
    RunningStateClass.prototype.create = function(){
        this.game.stage.backgroundColor = '#FAED95';
        var self = this;
        drawGrid(self);
        self.numberOfCells = self.game.stage.width * self.game.stage.height * 0.01;
        diagonal(self);
    };
    
    RunningStateClass.prototype.update = function(){};

    /**
     * Privated method that draw a diagonal based on the width of the main canvas
     * @TODO interpolate with the height in order to achieve the real diagonal
     */
    function diagonal(self){
        var bound = self.game.stage.width / 10;
        for(var i = 0; i < bound; i++){
            drawRect(self, [i, i], {'color' : '#FF0000'}, spriteAlphaEasing);
        }
    }
    
    /**
     * Private function for alpha easing filter
     * @param sprite Phaser.Sprite
     */
    function spriteAlphaEasing(sprite){
        self.game.add.tween(sprite).to({alpha : 0}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    }

    /**
     * Privated method for draw a rectangle given its position, style {color} and a filtering effect.
     * @param self context object
     * @param pos [col, row]
     * @param style {color}
     * @param effects function(sprite)
     */
    function drawRect(self, pos, style, effects){
        var rect = self.game.add.bitmapData(8, 8);
        rect.ctx.fillStyle = style.color;
        self.Polygons.drawRect(rect.ctx, 8);
        var x = pos[0] * 10 + 5;
        var y = pos[1] * 10 + 5;
        var rectSprite = self.game.add.sprite(x, y, rect);
        rectSprite.anchor.setTo(0.5, 0.5);
        if(typeof(effects) === "function"){
            effects(rectSprite);
        }
    }
    
    
    
    
    /**
     * Privated method that draws a parallel lines from to a given direction
     * @param self context object
     * @param params {step, style : {lineWidth, color}, bound}
     * @param getDrawDirectionParams function(updatedStep)
     */
    function drawGridDirection(self, params, getDrawDirectionParams){
        var dirStep = params.step;
        var style = params.style;
        while(dirStep < params.bound){
            var dirParams = getDrawDirectionParams(dirStep);
            self.Polygons.drawLine(self.grid.ctx, dirParams.from, dirParams.to, style);
            dirStep += params.step;
        }
    }
    
    /**
     * Privated method that draws a Grid into the canvas based on its height and width
     * @param self context object
     */
    function drawGrid(self){
        var stage = self.game.stage;
        self.grid = self.game.add.bitmapData(self.game.stage.width, self.game.stage.height);
        self.game.add.sprite(0, 0, self.grid);
       
        var style = {'lineWidth' : 0.5, 'color' : '#FCDB73'};
        
        //First we draw Y direction
        var paramY = {'step' : 10, 'style' : style, 'bound' : stage.height};
        drawGridDirection(self, paramY, function(step){
            return { 
                'from' : {'x' : 0, 'y' : step},
                'to' : {'x' : stage.width, 'y' : step}
            };
        });
        
        //Then we draw X direction
        var paramX = {'step' : 10, 'style' : style, 'bound' : stage.width};
        drawGridDirection(self, paramX, function(step){
            return { 
                'from' : {'x' : step, 'y' : 0},
                'to' : {'x' : step, 'y' : stage.height}
            };
        });
        
        //And finally we draw the grid bounds
        self.Polygons.drawLine(self.grid.ctx, {'x' : 0, 'y' : 0.5}, {'x' : stage.width, 'y' : 0.5}, style);
        self.Polygons.drawLine(self.grid.ctx, {'x' : 0, 'y' : stage.height-0.5}, {'x' : stage.width, 'y' :  stage.height-0.5}, style);
        self.Polygons.drawLine(self.grid.ctx, {'x' : 0.5, 'y' : 0}, {'x' : 0.5, 'y' : stage.height}, style);
        self.Polygons.drawLine(self.grid.ctx, {'x' : stage.width-0.5, 'y' : 0}, {'x' : stage.width-0.5, 'y' : stage.height}, style);
       

    }

    return new RunningStateClass();
};


//define module export
define(['utils/polygons'], function (_Polygons) {
    return {
        getState: function () {
            return new RunningState(_Polygons.getInstance());
        }
    };
});