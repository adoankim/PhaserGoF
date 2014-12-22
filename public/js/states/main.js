/**
 * main.js
 * Main state where the game starts
 */
 
var MainState = function(){}

MainState.prototype.preload = function(){}
MainState.prototype.create = function(){
    this.game.stage.backgroundColor = '#FAED96'
    this.game.state.start('running')
}
MainState.prototype.update = function(){}

//define module export
define(function () {
    return {
        getState: function () {
            return new MainState()
        }
    };
});