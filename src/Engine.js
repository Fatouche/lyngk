"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    var varGameBoard = {};
    var player;
    var colorRequestPlayer1 = [];
    var colorRequestPlayer2 = [];
    var PieceNumber = 0;
    var scorePlayer1 = 0;
    var scorePlayer2 = 0;

    var init = function () {
        var coordinates = Lyngk.valideCordinate;
        player = 0;

        for (var i = 0; i < coordinates.length; i++) {
            varGameBoard[coordinates[i]] = new Lyngk.Intersection();
        }
    };

    this.getPlayer = function () {
        return player;
    };

    this.getPieceNumber = function () {
        return PieceNumber;
    };

    this.getScore = function (currentPlayer) {
        if (currentPlayer === 0) {
            return scorePlayer1;
        } else {
            return scorePlayer2;
        }
    };

    var nextPlayer = function () {
        if (player === 0) {
            player = 1;
        } else {
            player = 0;
        }
    };

    this.initBoardGame = function () {
        for (var coordinates in varGameBoard) {
            if (varGameBoard.hasOwnProperty(coordinates)) {
                varGameBoard[coordinates].putPiece(Lyngk.Color.IVORY);
            }
        }
    };

    var searchBoardGameOnePiece = function (coordinates) {
        if (varGameBoard.hasOwnProperty(coordinates)) {
            if (varGameBoard[coordinates].getState() !== Lyngk.State.ONE_PIECE){
                return false;
            }
        }
    };

    this.BoardGamePieceFull = function () {
        for (var coordinates in varGameBoard) {
            searchBoardGameOnePiece(coordinates);
        }
        return true;
    };

    var fillGameBoard = function (availablePiece, coordinates) {
        if (varGameBoard.hasOwnProperty(coordinates)) {
            var randomColor;
            do {
                randomColor = Math.floor(Math.random() * 6);
            } while (availablePiece[randomColor] <= 0);
            availablePiece[randomColor]--;
            varGameBoard[coordinates].putPiece(randomColor);
            PieceNumber = PieceNumber + 1;
        }
    };

    this.initColorBoardGame = function () {
        var availablePiece = [8, 8, 8, 8, 8, 3];
        for (var coordinates in varGameBoard) {
            fillGameBoard(availablePiece, coordinates);
        }
    };

    var moveOK = function (source, destination) {
        var myTest = false;
        var range = parseInt(source.charAt(1)) - parseInt(destination.charAt(1));
        if (source.charAt(0) === destination.charAt(0)) {
            myTest = (range === 1 || range === -1);
        } else if (source.charAt(0) > destination.charAt(0)) {
            myTest = (range === 1 || range === 0);
        } else if (source.charAt(0) < destination.charAt(0)) {
            myTest = (range === 0 || range === -1);
        }
        return myTest;
    };

    var addPoint = function (){
        if (player === 0) {
            scorePlayer1 = scorePlayer1 + 1;
        } else {
            scorePlayer2 = scorePlayer2 + 1;
        }
    };

    var removeStak = function (stak) {
        for (var currentPieceRemove in varGameBoard[stak].getPiece()) {
            varGameBoard[stak].removePiece(currentPieceRemove);
            PieceNumber = PieceNumber - 1;
        }
    };

    this.move = function (source, destination) {
        if (varGameBoard[destination].getState() != Lyngk.State.VACANT) {
            if (moveOK(source, destination)) {
                if (varGameBoard[source].getState() != Lyngk.State.FULL_STACK) {
                    if (varGameBoard[source].getHeight() >= varGameBoard[destination].getHeight()) {
                        if (colorTest(source, destination)) {
                            var currentPiece = varGameBoard[source].getPiece();
                            for (var movingPiece in currentPiece) {
                                varGameBoard[destination].putPiece(currentPiece[movingPiece].getColor());
                                varGameBoard[source].removePiece(parseInt(movingPiece));
                            }
                        }
                    }
                }
            }
        }

        if (varGameBoard[destination].getState() == Lyngk.State.FULL_STACK) {
            addPoint();
            removeStak(destination);
            nextPlayer();
        } else {
            nextPlayer();
        }
    };

    this.getcolorRequest = function (color) {
        if (color === 1) {
            return colorRequestPlayer1;
        } else {
            return colorRequestPlayer2;
        }
    };

    this.colorRequest = function (color) {
        if (colorRequestPlayer1.indexOf(color) == -1 && colorRequestPlayer2.indexOf(color) === -1) {
            if (this.getPlayer() === 1) {
                colorRequestPlayer1.push(color);
            } else {
                colorRequestPlayer2.push(color);
            }
        }
    };

    var colorPieceStackDifferent = function(sourcePiece,destinationPiece,pieceColorSourceStak,pieceColorDestinationStak){
        if (destinationPiece[pieceColorDestinationStak].getColor() === sourcePiece[pieceColorSourceStak].getColor()) {
            if(destinationPiece[pieceColorDestinationStak].getColor() != Lyngk.Color.WHITE) {
                return false;
            }
        }
        return true;
    };

    var colorTest = function (source, destination) {
        var myTest = true;
        var sourcePiece = varGameBoard[source].getPiece();
        var destinationPiece = varGameBoard[destination].getPiece();

        for (var pieceColorSourceStak in sourcePiece) {
            for (var pieceColorDestinationStak in destinationPiece) {
                myTest = colorPieceStackDifferent(sourcePiece,destinationPiece,pieceColorSourceStak,pieceColorDestinationStak);
            }
        }
        return myTest;
    };

    this.board = function () {
        return varGameBoard;
    };

    init();

};
