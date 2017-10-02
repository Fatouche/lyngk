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
