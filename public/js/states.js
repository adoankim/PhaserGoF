/**
 * @author       adoankim <adoankim@alumnos.uvigo.es>
 * @copyright    2014 adoankim
 * @license      {@link https://github.com/adoankim/PhaserGoF/blob/master/LICENSE|MIT License}
 * 
 * states.js
 * module that handles states loading
 */
var states = ['main', 'running'];
var defaultState = 'main';

states.forEach(function(state){
    loadState(state);
});

function loadState(state){
    require(['js/states/' + state + '.js'], function(handler){
        game.state.add(state, handler.getState(), false);
        if(defaultState == state){
            game.state.start(state);
        }
    });
}
