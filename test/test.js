'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.test1 = function () {
    var cel = new Lyngk.Coordinates('A', 1);
    assertFalse(cel.valid());
};

LyngkTestCase.prototype.test2 = function () {
    var cmpt = 0;
    var cel;

    for (var col = 65; col <= 74; col++) {
        for (var lig = 1; lig <= 9; lig++) {
            cel = new Lyngk.Coordinates(String.fromCharCode(col), lig);
            if (cel.valid()) {
                cmpt = cmpt + 1;
            }
        }
    }

    assertEquals(cmpt, 43);
};

LyngkTestCase.prototype.test3 = function () {
    var cel = new Lyngk.Coordinates('A', 3);
    assertEquals(cel.toString(), 'A3');
};

LyngkTestCase.prototype.test4 = function () {
    var cel = new Lyngk.Coordinates('A', 1);
    assertEquals(cel.toString(), "invalid");
};

LyngkTestCase.prototype.test5 = function () {
    var cel = new Lyngk.Coordinates('A', 3);
    var celClone = cel.clone();

    assertEquals(cel.toString(), celClone.toString());
};

LyngkTestCase.prototype.test6 = function () {
    var cel = new Lyngk.Coordinates('A', 3);
    assertEquals(cel.hash(), 653);

};

LyngkTestCase.prototype.test7 = function () {
    var intersec = new Lyngk.Intersection();
    assertEquals(intersec.getState(), Lyngk.State.VACANT);

};

LyngkTestCase.prototype.test8 = function () {
    var intersec = new Lyngk.Intersection();
    intersec.putPiece(Lyngk.Color.BLUE);
    assertEquals(intersec.getState(), Lyngk.State.ONE_PIECE);
    assertEquals(intersec.getColor(), Lyngk.Color.BLUE);

};

LyngkTestCase.prototype.test9 = function () {
    var intersec = new Lyngk.Intersection();
    intersec.putPiece(Lyngk.Color.BLUE);
    intersec.putPiece(Lyngk.Color.RED);
    assertEquals(intersec.getState(), Lyngk.State.STACK);
    assertEquals(intersec.getColor(), Lyngk.Color.RED);

};

LyngkTestCase.prototype.test10 = function () {
    var intersect = new Lyngk.Intersection();
    intersect.putPiece(Lyngk.Color.BLUE);
    intersect.putPiece(Lyngk.Color.RED);
    intersect.putPiece(Lyngk.Color.BLACK);
    intersect.putPiece(Lyngk.Color.GREEN);
    intersect.putPiece(Lyngk.Color.IVORY);
    assertEquals(intersect.getState(), Lyngk.State.FULL_STACK);
};

LyngkTestCase.prototype.test11 = function () {
    var plateauFull = new Lyngk.Engine();
    plateauFull.initBoardGame();
    assertTrue(plateauFull.BoardGamePieceFull());
};

LyngkTestCase.prototype.test12 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();
    var plateau = engine.board();
    var colorNumber = [0, 0, 0, 0, 0, 0];
    for (var coord in plateau) {
        if (plateau.hasOwnProperty(coord)) {
            colorNumber[plateau[coord].getColor()]++;
        }
    }
    var dac = true;
    for (var i = 0; i < colorNumber.length; i++) {
        if (i <= 4 && colorNumber[i] != 8)
            dac = false;
        else if (i == 5 && colorNumber[i] != 3)
            dac = false;
    }
    assertTrue(dac);
};

LyngkTestCase.prototype.test13 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();

    var plateau = engine.board();

    for (var ind in plateau) {
        assertEquals(plateau[ind].getHeight(), 1);
    }
};

LyngkTestCase.prototype.test14 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();

    var plateau = engine.board();

    for (var ind in plateau) {
        assertEquals(plateau[ind].getColor(), plateau[ind].getTopPiece().getColor());
    }
};

LyngkTestCase.prototype.test15 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();
    var plateau = engine.board();
    var couleurTest = plateau["A3"].getColor();

    plateau["B3"].removePiece(1);
    plateau["B3"].putPiece(Lyngk.Color.WHITE);

    engine.move("A3", "B3");

    assertEquals(plateau["A3"].getHeight(), 0);
    assertEquals(plateau["A3"].getState(), Lyngk.State.VACANT);
    assertEquals(plateau["B3"].getColor(), couleurTest);
    assertEquals(plateau["B3"].getHeight(), 2);
};

LyngkTestCase.prototype.test16 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();
    var plateau = engine.board();
    var couleurTest = plateau["A3"].getColor();
    engine.move("A3", "B3");

    assertEquals(plateau["A3"].getHeight(), 0);
    assertEquals(plateau["A3"].getState(), Lyngk.State.VACANT);
    assertEquals(plateau["B3"].getColor(), couleurTest);
    assertEquals(plateau["B3"].getHeight(), 2);

    couleurTest = plateau["B3"].getColor();
    engine.move("B3", "B2");

    assertEquals(plateau["B3"].getHeight(), 0);
    assertEquals(plateau["B3"].getState(), Lyngk.State.VACANT);
    assertEquals(plateau["B2"].getState(), Lyngk.State.STACK);
    assertEquals(plateau["B2"].getColor(), couleurTest);
    assertEquals(plateau["B2"].getHeight(), 3);
};

LyngkTestCase.prototype.test17 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();
    var plateau = engine.board();

    plateau["B3"].removePiece(1);
    plateau["B3"].putPiece(Lyngk.Color.WHITE);

    var couleurTest = plateau["B2"].getColor();

    engine.move("B2", "B3");
    engine.move("B3", "B2");

    assertEquals(plateau["B3"].getHeight(), 2);
    assertEquals(plateau["B3"].getColor(), couleurTest);
    assertEquals(plateau["B2"].getHeight(), 0);

    assertEquals(plateau["B3"].getState(), Lyngk.State.STACK);
    assertEquals(plateau["B2"].getState(), Lyngk.State.VACANT);

};

LyngkTestCase.prototype.test18 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();
    var plateau = engine.board();

    var couleurTest = plateau["B2"].getColor();

    engine.move("C2", "B3");

    assertEquals(plateau["B3"].getHeight(), 1);
    assertEquals(plateau["C2"].getHeight(), 1);

    assertEquals(plateau["B3"].getState(), Lyngk.State.ONE_PIECE);
    assertEquals(plateau["B2"].getState(), Lyngk.State.ONE_PIECE);

};

LyngkTestCase.prototype.test19 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();
    var plateau = engine.board();

    plateau["H6"].removePiece(1);
    plateau["H6"].putPiece(Lyngk.Color.WHITE);

    plateau["H8"].removePiece(1);
    plateau["H8"].putPiece(Lyngk.Color.WHITE);

    engine.move("I7", "H6");
    engine.move("H6", "H5");

    engine.move("H5", "H8");
    engine.move("H5", "F3");

    assertTrue(plateau["H5"].getHeight() === 3 && plateau["H8"].getHeight() === 1);
    assertTrue(plateau["H5"].getHeight() === 3 && plateau["F3"].getHeight() === 1);

};

LyngkTestCase.prototype.test20 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();
    var plateau = engine.board();

    engine.move("A3", "B3");
    engine.move("B3", "C3");
    engine.move("C3", "D3");
    engine.move("D3", "E3");

    engine.move("E3", "F3");

    assertEquals(plateau["E3"].getHeight(), 5);
    assertEquals(plateau["E3"].getState(), Lyngk.State.FULL_STACK);

    assertEquals(plateau["F3"].getHeight(), 1);
    assertEquals(plateau["F3"].getState(), Lyngk.State.ONE_PIECE);

};

LyngkTestCase.prototype.test21 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();
    var plateau = engine.board();

    engine.move("A3", "B3");
    engine.move("C3", "B3");

    assertEquals(plateau["B3"].getHeight(), 2);
    assertEquals(plateau["C3"].getHeight(), 1);
};

LyngkTestCase.prototype.test22 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();
    var plateau = engine.board();

    engine.move("A3", "B3");
    engine.move("B3", "C3");
    engine.move("C3", "D3");

    engine.move("E3", "D3");

    assertEquals(plateau["D3"].getHeight(), 4);
    assertEquals(plateau["E3"].getHeight(), 1);
};

LyngkTestCase.prototype.test23 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();
    var plateau = engine.board();

    plateau["A3"].removePiece(1);
    plateau["B3"].removePiece(1);

    plateau["A3"].putPiece(Lyngk.Color.BLUE);
    plateau["A3"].putPiece(Lyngk.Color.WHITE);
    plateau["B3"].putPiece(Lyngk.Color.BLUE);
    plateau["B3"].putPiece(Lyngk.Color.WHITE);

    engine.move("A3", "B3");

    assertEquals(plateau["A3"].getHeight(), 2);
    assertEquals(plateau["B3"].getHeight(), 2);
};

LyngkTestCase.prototype.test24 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();

    assertEquals(engine.getPlayer(), 0);
};

LyngkTestCase.prototype.test25 = function () {
    var engine = new Lyngk.Engine();

    engine.initColorBoardGame();
    engine.move("A3", "B3");

    assertEquals(engine.getPlayer(), 1);
};

LyngkTestCase.prototype.test26 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();

    engine.colorRequest(Lyngk.Color.RED);

    engine.move("A3", "B3");

    engine.colorRequest(Lyngk.Color.GREEN);

    assertEquals(engine.getcolorRequest(0), Lyngk.Color.RED);
    assertEquals(engine.getcolorRequest(1), Lyngk.Color.GREEN);

};

LyngkTestCase.prototype.test27 = function () {
    var engine = new Lyngk.Engine();
    engine.initColorBoardGame();

    var plateau = engine.board();

    //Modification des couleurs sur la route joueur 1
    plateau["A3"].removePiece(1);
    plateau["A3"].putPiece(Lyngk.Color.BLUE);

    plateau["B3"].removePiece(1);
    plateau["B3"].putPiece(Lyngk.Color.RED);

    plateau["C3"].removePiece(1);
    plateau["C3"].putPiece(Lyngk.Color.WHITE);

    plateau["C2"].removePiece(1);
    plateau["C2"].putPiece(Lyngk.Color.GREEN);

    plateau["D2"].removePiece(1);
    plateau["D2"].putPiece(Lyngk.Color.BLACK);

    //joueur1
    engine.colorRequest(Lyngk.Color.BLUE);
    engine.move("A3", "B3");

    //joueur2
    engine.move("H6", "G5");

    //joueur1
    engine.move("B3", "C3");

    //joueur2
    engine.move("G5", "G6");

    //joueur1
    engine.move("C3", "C2");

    //joueur2
    engine.move("G6", "H7");

    //joueur1, marque un point
    engine.move("C2", "D2");

    console.log("Nombre piece board : " + engine.getPieceNumber());
    console.log("Joueur : " + engine.getPlayer());
    console.log("score : " + engine.getScore(0));

    assertEquals(engine.getScore(0), 1);
    assertEquals(engine.getPieceNumber(), 38);

};