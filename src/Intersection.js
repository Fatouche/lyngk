"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {

    var piece = [];
    var color;
    var celState = Lyngk.State.VACANT;

    this.getState = function(){
        return celState;
    };

    this.getColor = function(){
        return piece.getColor();
    };

    this.pose = function(color) {
        if(piece.length <=0) {
            celState = Lyngk.State.ONE_PIECE;
        }
        else if(piece.length > 0 && piece.length < 4) {
            celState = Lyngk.State.STACK;
        }
        else if(piece.length >= 4) {
            celState = Lyngk.State.FULL_STACK;
        }

        piece.push(new Lyngk.Piece(color));
        color = color;
    };

};
