var inherits = require("util").inherits,
    Unit = require("../unit.js");

function Commander() {}

inherits(Commander, Unit);

Commander.prototype.command = function(target) {

}

module.exports = Commander;