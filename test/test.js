'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testA = function () {
    var cel = new Lyngk.Coordinates('A', 1);
    assertFalse(cel.valid());
};

LyngkTestCase.prototype.testB = function () {
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

LyngkTestCase.prototype.testC = function() {
    var cel = new Lyngk.Coordinates('A', 3);
    assertEquals(cel.toString(),'A3');
};

LyngkTestCase.prototype.testD = function()
{
    var cel = new Lyngk.Coordinates('A',1);
    assertEquals(cel.toString(), "invalid");
};

LyngkTestCase.prototype.testE = function()
{
    var cel = new Lyngk.Coordinates('A',3);
    var celClone = cel.clone();

    assertEquals(cel.toString(), celClone.toString());
};

LyngkTestCase.prototype.testF = function()
{
    var cel = new Lyngk.Coordinates('A',3);
    assertEquals(cel.hash(), 683);

};

LyngkTestCase.prototype.testF = function()
{
    var intersec = new Lyngk.Intersection();
    assertEquals(intersec.getState(), Lyngk.State.VACANT);

};

LyngkTestCase.prototype.testG = function()
{
    var intersec = new Lyngk.Intersection();
    intersec.pose(Lyngk.Color.BLUE);
    assertEquals(intersec.getState(),Lyngk.State.ONE_PIECE);
    assertEquals(intersec.getColor(), Lyngk.Color.BLUE);

};

LyngkTestCase.prototype.testH = function()
{
    var intersec = new Lyngk.Intersection();
    intersec.pose(Lyngk.Color.BLUE);
    intersec.pose(Lyngk.Color.RED);
    assertEquals(intersec.getState(),Lyngk.State.STACK);
    assertEquals(intersec.getColor(), Lyngk.Color.RED);

};