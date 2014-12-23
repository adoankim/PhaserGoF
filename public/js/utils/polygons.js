/**
 * @author       adoankim <adoankim@alumnos.uvigo.es>
 * @copyright    2014 adoankim
 * @license      {@link https://github.com/adoankim/PhaserGoF/blob/master/LICENSE|MIT License}
 * 
 * polygons.js
 * Util for drawing poligonal primitives
 */

var Polygon = function(){
    var PolygonClass = function(){};
    
    /**
     * Given a context draw a Line from a given point {x, y} to a given one {x, y}
     * with the given style {color, lineWidth}
     */
    PolygonClass.prototype.drawLine = function(ctx, from, to, style){

        style = styleControl(style);
        ctx.strokeStyle = style.color;
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.lineWidth = style.lineWidth;
        ctx.stroke();
    };
    
    PolygonClass.prototype.drawRect = function(ctx, sideWidth, style){
        ctx.fillRect(0, 0, sideWidth, sideWidth);
        ctx.stroke();
    };
    
    /**
     *  privated method that controls the default values for style argument instance
     */
    function styleControl(style){
        if(style === undefined){
            style = {'color' : 'black', 'lineWidth' : 1};
        }
        
        if(style.color === undefined){
            style.color = "black";
        }
        
        if(style.lineWidth === undefined ){
            style.lineWidth = 1;
        }
        
        return style;
    }
    
    return new PolygonClass();
};

//define module export
define(function () {
    return {
        getInstance: function () {
            return new Polygon();
        }
    };
});