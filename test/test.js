'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testA = function(){
    var cel = new Lyngk.Coordinates('A',1);
    assertFalse(cel.valid());
};
