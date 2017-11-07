"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    var coordonneeInterssection = {};

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

    this.initPlateauCouleur = function()
    {
        var dispo = [8,8,8,8,8,3];
        for (var coor in coordonneeInterssection) {
            if (coordonneeInterssection.hasOwnProperty(coor))
            {
                var randomColor;
                do{
                    randomColor = Math.floor(Math.random() * 6);
                }while(dispo[randomColor] <= 0)
                dispo[randomColor]--;
                coordonneeInterssection[coor].pose(randomColor);
            }
        }
    };

    this.deplace = function(a,b) {
        coordonneeInterssection[b].pose(coordonneeInterssection[a].topPiece().getColor());
        coordonneeInterssection[a].remove();
        var piece = coordonneeInterssection[a].getPiece();
        for (var p in piece){
            coordonneeInterssection[b].pose(piece[p].getColor());
            coordonneeInterssection[a].remove(parseInt(p));
        }
    };

    this.plateau = function()
    {
        return coordonneeInterssection;
    };

};
