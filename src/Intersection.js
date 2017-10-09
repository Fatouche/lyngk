"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {

    var piece;
    var celState = Lyngk.State.VACANT;

    this.getState = function(){
        return celState;
    };

    this.getColor = function(){
        return piece.getColor();
    };

    this.pose = function(color) {
        if(!piece) {
            piece = new Lyngk.Piece(color);
            celState = Lyngk.State.ONE_PIECE;
        }else{
            piece = new Lyngk.Piece(color);
            celState = Lyngk.State.STACK;
        }
    };

};
