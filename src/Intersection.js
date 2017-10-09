"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {

    var celState = Lyngk.State.VACANT;

    this.getState = function(){
        return celState;
    };
    

};
