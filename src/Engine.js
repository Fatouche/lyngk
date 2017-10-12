"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    var coordonneeInterssection = [];

    this.initPlateau = function()
    {
        for (var coord in coordonneeInterssection) {
            if (coordonneeInterssection.hasOwnProperty(coord))
            {
                coordonneeInterssection[coord].poser(Lyngk.Color.IVORY);
            }
        }
    };

    this.plateau1PieceFull = function()
    {
        for (var coord in coordonneeInterssection) {
            if (coordonneeInterssection.hasOwnProperty(coord))
            {
                if(coordonneeInterssection[coord].getState() != Lyngk.State.ONE_PIECE)
                    return false;
            }
        }
        return true;
    };

    this.plateau = function()
    {
        return coordonneeInterssection;
    };

};
