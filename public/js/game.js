/**
 * @author       adoankim <adoankim@alumnos.uvigo.es>
 * @copyright    2014 adoankim
 * @license      {@link https://github.com/adoankim/PhaserGoF/blob/master/LICENSE|MIT License}
 * 
 * game.js
 * Game init and states configuration  
 */
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvas');
require.config({
    paths: {
        'underscore': '/vendor/js/underscore-min'
    }
});
require(['js/states.js']);
