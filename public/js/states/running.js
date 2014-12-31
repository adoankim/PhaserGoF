/**
 * @author       adoankim <adoankim@alumnos.uvigo.es>
 * @copyright    2014 adoankim
 * @license      {@link https://github.com/adoankim/PhaserGoF/blob/master/LICENSE|MIT License}
 * 
 * running.js
 * Running game state 
 */
var RunningState = function(Polygons, GOFManager){
    
    var RunningStateClass = function(){
       this.cellsSprites = [];
    };
    
    RunningStateClass.prototype.preload = function(){
        this.game.load.json('basic_patterns', '/assets/patterns/basics.json');
    };
    
    RunningStateClass.prototype.create = function(){
        patternsSetup();

        this.game.stage.backgroundColor = '#FAED95';
        drawGrid(this);
        this.numberOfCells = this.game.stage.width * this.game.stage.height * 0.01;

        
     
    };
    
    
    function patternsSetup(){
        setPattern(this.game.cache.getJSON('basic_patterns')['block'], 
                {'x' : 1, 'y': 1});
        setPattern(this.game.cache.getJSON('basic_patterns')['boat'], 
                {'x' : 4, 'y': 4});
        setPattern(this.game.cache.getJSON('basic_patterns')['blinker'], 
                {'x' : 8, 'y': 8});
        setPattern(this.game.cache.getJSON('basic_patterns')['toad'], 
                {'x' : 11, 'y': 11});
        setPattern(this.game.cache.getJSON('basic_patterns')['beehive'], 
                {'x' : 15, 'y': 15});
        setPattern(this.game.cache.getJSON('basic_patterns')['loaf'], 
                {'x' : 19, 'y': 19});
        setPattern(this.game.cache.getJSON('basic_patterns')['lwss'], 
                {'x' : 40, 'y': 50});
        setPattern(this.game.cache.getJSON('basic_patterns')['lwss'], 
                {'x' : 47, 'y': 50});
        setPattern(this.game.cache.getJSON('basic_patterns')['lwss'], 
                {'x' : 54, 'y': 50});
                
                
    }
    
    function setPattern(pattern, offset){
        if(offset === undefined){
            offset = {'x' : 0, 'y' : 0};
        }
        
        pattern.map(function(cell){
            GOFManager.addCell({'x' : cell.x + offset.x, 'y' : cell.y + offset.y});
        })
    }
    
 
    function stepGeneration(){
        var livingCells = GOFManager.getLivingCells();
        this.cellsSprites.map(function(sprite){
            sprite.clear();
        });
        this.cellsSprites = [];
        
        if(livingCells.length == 0){
            this.timer.stop(true);
            return;
        }
        
        livingCells.forEach(function(val){
            drawRect(this, [val.x, val.y], {'color' : '#FF0000'});
        }.bind(this));
        GOFManager.calculateNextGeneration();
    }
    
    RunningStateClass.prototype.update = function(){
        stepGeneration.bind(this)();
    };

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
        self.game.add.tween(sprite).to({alpha : 0.3}, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
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
        self.cellsSprites.push(rect);
        rect.ctx.fillStyle = style.color;
        Polygons.drawRect(rect.ctx, 8);
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
            Polygons.drawLine(self.grid.ctx, dirParams.from, dirParams.to, style);
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
        Polygons.drawLine(self.grid.ctx, {'x' : 0, 'y' : 0.5}, {'x' : stage.width, 'y' : 0.5}, style);
        Polygons.drawLine(self.grid.ctx, {'x' : 0, 'y' : stage.height-0.5}, {'x' : stage.width, 'y' :  stage.height-0.5}, style);
        Polygons.drawLine(self.grid.ctx, {'x' : 0.5, 'y' : 0}, {'x' : 0.5, 'y' : stage.height}, style);
        Polygons.drawLine(self.grid.ctx, {'x' : stage.width-0.5, 'y' : 0}, {'x' : stage.width-0.5, 'y' : stage.height}, style);
       

    }

    return new RunningStateClass();
};


//define module export
define(['utils/polygons', 'unit/GOFManager'], function (Polygons, GOFManager) {
    return {
        getState: function () {
            return new RunningState(Polygons.getInstance(), GOFManager.getInstance(80, 60));
        }
    };
});