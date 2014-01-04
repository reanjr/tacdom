function Unit() {}

Unit.attack = function() {}

Unit.prototype.atk = 2;
Unit.prototype.def = 2;
Unit.prototype.speed = 2;
Unit.prototype.weapon = 1;
Unit.prototype.armor = 0;
Unit.prototype.block = 1;
Unit.prototype.health = 10;

Unit.prototype.attack = function(target) {
    var attack = this.atk + this.weapon,
        defense = target.def + target.armor,
        damage = defense == 0 ? attack + 1 : Math.round(attack / defense);

    target.damage(damage);
    return damage;
}

Unit.prototype.block = function() {

}

module.exports = Unit;
