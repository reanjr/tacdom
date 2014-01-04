var inherits = require("util").inherits,
    Unit = require("../unit.js");

function Irregular() {
    this.speed++;
}

inherits(Irregular, Unit);

module.exports = Irregular;