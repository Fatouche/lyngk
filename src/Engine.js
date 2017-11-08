"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    var coordonneeInterssection = {};
    var player;

    var init = function()
    {
        var coordo = Lyngk.tab;
        player = 0;

        for(var i = 0; i < coordo.length; i++)
        {
            coordonneeInterssection[coordo[i]] = new Lyngk.Intersection();
        }
    };

    this.getPlayer = function (){
        return player;
    };


    this.initPlateau = function()
    {
        for (var coord in coordonneeInterssection) {
            if (coordonneeInterssection.hasOwnProperty(coord))
            {
                coordonneeInterssection[coord].pose(Lyngk.Color.IVORY);
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

    var deplacementOK = function (init,dest) {
        var dac = false;
        var test;
        if (init.charAt(0) === dest.charAt(0)){

            test = parseInt(init.charAt(1)) - parseInt(dest.charAt(1));
            if(test == 1 || test == -1){
                dac =true ;
            }
        }else if (init.charAt(0) > dest.charAt(0)){
            test = parseInt(init.charAt(1)) - parseInt(dest.charAt(1));
            if(test == 1 || test == 0){
                dac =true ;
            }
        }else if (init.charAt(0) < dest.charAt(0)){
            test = parseInt(init.charAt(1)) - parseInt(dest.charAt(1));
            if(test == 0 || test == -1){
                dac =true ;
            }
        }
        return dac;
    };

    this.deplace = function(a,b) {
        if(coordonneeInterssection[b].getState()!= Lyngk.State.VACANT ) {
            if(deplacementOK(a,b)) {
                if (coordonneeInterssection[a].getState() != Lyngk.State.FULL_STACK) {
                    if(coordonneeInterssection[a].getHauteur() >= coordonneeInterssection[b].getHauteur()) {
                        if(couleurTest(a,b)) {
                            var piece = coordonneeInterssection[a].getPiece();
                            for (var p in piece) {
                                coordonneeInterssection[b].pose(piece[p].getColor());
                                coordonneeInterssection[a].remove(parseInt(p));
                            }
                        }
                    }
                }
            }
        }
    };

    var couleurTest = function (initial,dest) {
        var ok = true;
        var pieceIni = coordonneeInterssection[initial].getPiece();
        var pieceDest = coordonneeInterssection[dest].getPiece();

        for (var compteur in pieceIni) {
            for (var compt2 in pieceDest) {
                if (pieceDest[compt2].getColor() == pieceIni[compteur].getColor() && pieceDest[compt2].getColor() != Lyngk.Color.WHITE) {
                    ok = false;
                }
            }
        }
        return ok;
    };


    this.plateau = function()
    {
        return coordonneeInterssection;
    };

    init();

};
