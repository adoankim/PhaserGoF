/**
 * @author       adoankim <adoankim@alumnos.uvigo.es>
 * @copyright    2014 adoankim
 * @license      {@link https://github.com/adoankim/PhaserGoF/blob/master/LICENSE|MIT License}
 * 
 * states.js
 * module that handles states loading
 */
var states = ['running'];
var defaultState = 'main';
states.push(defaultState);

loadState(states.shift(), states);

function loadState(state, rest){
    require(['states/' + state], function(handler){
        game.state.add(state, handler.getState(), false);

        if(rest.length > 0){
            var nextState = rest.shift();
            loadState(nextState, rest);
        }else{
            //last state is the defaultState
            game.state.start(state);
        }
    });
}

