"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var state = Lyngk.State.VACANT;
    var pieces = [];

    this.getState = function () {
        return state;
    };

    var updateState = function () {
        state = Lyngk.State.VACANT;
        if (pieces.length === 1) {
            state = Lyngk.State.ONE_PIECE;
        } else if (pieces.length > 1 && pieces.length <= 4) {
            state = Lyngk.State.STACK;
        } else if (pieces.length > 4) {
            state = Lyngk.State.FULL_STACK;
        }
    };

    this.getHeight = function () {
        return pieces.length;
    };

    this.getTopPiece = function () {
        return pieces[pieces.length - 1];
    };

    this.getPiece = function () {
        return pieces;
    };

    this.getColor = function () {
        return pieces[pieces.length - 1].getColor();
    };

    this.putPiece = function (color) {
        pieces.push(new Lyngk.Piece(color));
        updateState();
    };

    this.removePiece = function (piece) {
        pieces = pieces.slice(piece, piece);
        updateState();
    };

};