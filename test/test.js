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

LyngkTestCase.prototype.test3 = function() {
    var cel = new Lyngk.Coordinates('A', 3);
    assertEquals(cel.toString(),'A3');
};

LyngkTestCase.prototype.test4 = function()
{
    var cel = new Lyngk.Coordinates('A',1);
    assertEquals(cel.toString(), "invalid");
};

LyngkTestCase.prototype.test5 = function()
{
    var cel = new Lyngk.Coordinates('A',3);
    var celClone = cel.clone();

    assertEquals(cel.toString(), celClone.toString());
};

LyngkTestCase.prototype.test6 = function()
{
    var cel = new Lyngk.Coordinates('A',3);
    assertEquals(cel.hash(), 653);

};

LyngkTestCase.prototype.test7 = function()
{
    var intersec = new Lyngk.Intersection();
    assertEquals(intersec.getState(), Lyngk.State.VACANT);

};

LyngkTestCase.prototype.test8 = function()
{
    var intersec = new Lyngk.Intersection();
    intersec.pose(Lyngk.Color.BLUE);
    assertEquals(intersec.getState(),Lyngk.State.ONE_PIECE);
    assertEquals(intersec.getColor(), Lyngk.Color.BLUE);

};

LyngkTestCase.prototype.test9 = function()
{
    var intersec = new Lyngk.Intersection();
    intersec.pose(Lyngk.Color.BLUE);
    intersec.pose(Lyngk.Color.RED);
    assertEquals(intersec.getState(),Lyngk.State.STACK);
    assertEquals(intersec.getColor(), Lyngk.Color.RED);

};

LyngkTestCase.prototype.test10 = function () {
    var intersect = new Lyngk.Intersection();
    intersect.pose(Lyngk.Color.BLUE);
    intersect.pose(Lyngk.Color.RED);
    intersect.pose(Lyngk.Color.BLACK);
    intersect.pose(Lyngk.Color.GREEN);
    intersect.pose(Lyngk.Color.IVORY);
    assertEquals(intersect.getState(),Lyngk.State.FULL_STACK);
};

LyngkTestCase.prototype.test11 = function () {
    var plateauFull = new Lyngk.Engine();
    plateauFull.initPlateau();
    assertTrue(plateauFull.plateau1PieceFull());
};

LyngkTestCase.prototype.test12 = function()
{
    var engine = new Lyngk.Engine();
    engine.initPlateauCouleur();
    var plateau = engine.plateau();
    var colorNumber = [0,0,0,0,0,0];
    for (var coord in plateau) {
        if (plateau.hasOwnProperty(coord))
        {
            colorNumber[plateau[coord].getColor()]++;
        }
    }
    var dac = true;
    for(var i = 0; i < colorNumber.length; i++)
    {
        if(i <= 4 && colorNumber[i] != 8)
            dac = false;
        else if(i == 5 && colorNumber[i] != 3)
            dac = false;
    }
    assertTrue(dac);
};

LyngkTestCase.prototype.test13 = function()
{
    var engine = new Lyngk.Engine();
    engine.initPlateauCouleur();

    var plateau = engine.plateau();

    for(var ind in plateau){
        assertEquals(plateau[ind].getHauteur(),1);
    }
};

LyngkTestCase.prototype.test14 = function () {
   var engine = new Lyngk.Engine();
   engine.initPlateauCouleur();

   var  plateau = engine.plateau();

    for(var ind in plateau){
        assertEquals(plateau[ind].getColor(), plateau[ind].getTopPiece().getColor());
    }
};

LyngkTestCase.prototype.test15 = function () {
    var engine = new Lyngk.Engine();
    engine.initPlateauCouleur();
    var plateau = engine.plateau();
    var couleurTest = plateau["A3"].getColor();
    engine.deplace("A3","B3");

    assertEquals(plateau["A3"].getHauteur(),0);
    assertEquals(plateau["A3"].getState(),Lyngk.State.VACANT);
    assertEquals(plateau["B3"].getColor(),couleurTest);
    assertEquals(plateau["B3"].getHauteur(),2);
};

LyngkTestCase.prototype.test16 = function () {
    var engine = new Lyngk.Engine();
    engine.initPlateauCouleur();
    var plateau = engine.plateau();
    var couleurTest = plateau["A3"].getColor();
    engine.deplace("A3","B3");

    assertEquals(plateau["A3"].getHauteur(),0);
    assertEquals(plateau["A3"].getState(),Lyngk.State.VACANT);
    assertEquals(plateau["B3"].getColor(),couleurTest);
    assertEquals(plateau["B3"].getHauteur(),2);

    couleurTest = plateau["B3"].getColor();
    engine.deplace("B3","B2");

    assertEquals(plateau["B3"].getHauteur(),0);
    assertEquals(plateau["B3"].getState(),Lyngk.State.VACANT);
    assertEquals(plateau["B2"].getState(),Lyngk.State.STACK);
    assertEquals(plateau["B2"].getColor(),couleurTest);
    assertEquals(plateau["B2"].getHauteur(),3);
};

LyngkTestCase.prototype.test17 = function () {
    var engine = new Lyngk.Engine();
    engine.initPlateauCouleur();
    var plateau = engine.plateau();

    var couleurTest = plateau["B2"].getColor();

    engine.deplace("B2","B3");
    engine.deplace("B3","B2");

    assertEquals(plateau["B3"].getHauteur(),2);
    assertEquals(plateau["B3"].getColor(),couleurTest);
    assertEquals(plateau["B2"].getHauteur(),0);

    assertEquals(plateau["B3"].getState(),Lyngk.State.STACK);
    assertEquals(plateau["B2"].getState(),Lyngk.State.VACANT);

};

LyngkTestCase.prototype.test18 = function () {
    var engine = new Lyngk.Engine();
    engine.initPlateauCouleur();
    var plateau = engine.plateau();

    var couleurTest = plateau["B2"].getColor();

    engine.deplace("C2","B3");

    assertEquals(plateau["B3"].getHauteur(),1);
    assertEquals(plateau["C2"].getHauteur(),1);

    assertEquals(plateau["B3"].getState(),Lyngk.State.ONE_PIECE);
    assertEquals(plateau["B2"].getState(),Lyngk.State.ONE_PIECE);

};

LyngkTestCase.prototype.test19 = function () {
    var engine = new Lyngk.Engine();
    engine.initPlateauCouleur();
    var plateau = engine.plateau();

    engine.deplace("I7","H6");
    engine.deplace("H6","H5");

    engine.deplace("H5","H8");
    engine.deplace("H5","F3");

    assertTrue(plateau["H5"].getHauteur() === 3 && plateau["H8"].getHauteur() === 1 );
    assertTrue(plateau["H5"].getHauteur() === 3 && plateau["F3"].getHauteur() === 1 );

};

LyngkTestCase.prototype.test20 = function () {
    var engine = new Lyngk.Engine();
    engine.initPlateauCouleur();
    var plateau = engine.plateau();

    engine.deplace("A3","B3");
    engine.deplace("B3","C3");
    engine.deplace("C3","D3");
    engine.deplace("D3","E3");

    engine.deplace("E3","F3");

    assertEquals(plateau["E3"].getHauteur(),5);
    assertEquals(plateau["E3"].getState(),Lyngk.State.FULL_STACK);

    assertEquals(plateau["F3"].getHauteur(),1);
    assertEquals(plateau["F3"].getState(),Lyngk.State.ONE_PIECE);

};

LyngkTestCase.prototype.test21 = function () {
    var engine = new Lyngk.Engine();
    engine.initPlateauCouleur();
    var plateau = engine.plateau();

    engine.deplace("A3","B3");
    engine.deplace("C3","B3");

    assertEquals(plateau["B3"].getHauteur(),2);
    assertEquals(plateau["C3"].getHauteur(),1);
};

LyngkTestCase.prototype.test22 = function () {
    var engine = new Lyngk.Engine();
    engine.initPlateauCouleur();
    var plateau = engine.plateau();

    engine.deplace("A3","B3");
    engine.deplace("B3","C3");
    engine.deplace("C3","D3");

    engine.deplace("E3","D3");

    assertEquals(plateau["D3"].getHauteur(),4);
    assertEquals(plateau["E3"].getHauteur(),1);
};

LyngkTestCase.prototype.test23 = function () {
    var engine = new Lyngk.Engine();
    engine.initPlateauCouleur();
    var plateau = engine.plateau();

    plateau["A3"].remove(1);
    plateau["B3"].remove(1);

    plateau["A3"].pose(Lyngk.Color.BLUE);
    plateau["A3"].pose(Lyngk.Color.WHITE);
    plateau["B3"].pose(Lyngk.Color.BLUE);
    plateau["B3"].pose(Lyngk.Color.WHITE);

    engine.deplace("A3","B3");

    assertEquals(plateau["A3"].getHauteur(),2);
    assertEquals(plateau["B3"].getHauteur(),2);
};

LyngkTestCase.prototype.test24 = function () {
  var engine = new Lyngk.Engine();
  engine.initPlateauCouleur();

  assertEquals(engine.getPlayer(),0);
};