var inherits = require("util").inherits,
    Unit = require("../unit.js");

function Infantry() {
    this.atk++;
}

inherits(Irregular, Unit);

module.exports = Irregular;