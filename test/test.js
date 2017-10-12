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
