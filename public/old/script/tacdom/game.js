"use strict";

define(["core", "tacdom/map", function(core, map) {

    var gameView = "#wla-tacdom";   // When Lemmings Attack - Tactical Domination

    function Game() {
        core.extend(this, core.Model);

        this.map = new map.Map();
        this.map.changeSize(3);
    }

})