/**
 * running.js
 * Running game state 
 */
 
var RunningState = function(){}

RunningState.prototype.preload = function(){}
RunningState.prototype.create = function(){}
RunningState.prototype.update = function(){}

//define module export
define(function () {
    return {
        getState: function () {
            return new RunningState();
        }
    };
});