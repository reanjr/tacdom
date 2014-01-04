define(["core", "tacdom/equip/weapon"], function(core, Weapon) {

    function Unit() {
        this.hp = 10;
        this.speed = 1;
        this.climb = 1;
        this.actions = 1;

        this.strength = 1;
        this.agility = 1;
        this.cunning = 1;
        this.will = 1;

        this.equipment = {
            "head": null,
            "dexter": null,
            "sinister": null,
            "body": null,
            "paws": null
        };

        this.skills = [];
    }

    /**
     * Return the unit's equipped weapon.
     * @return {object|null}
     */
    Unit.prototype.weapon = function() {
        if (this.equipment.dexter instanceof Weapon)
            return this.equipment.dexter;
        if (this.equipment.sinister instanceof Weapon)
            return this.equipment.sinister;
        return null;
    }

    /**
     * Return the physical attack of this unit.  This is the number used to
     * determine damage when this unit performs a regular attack.
     * @return {number}
     */
    Unit.prototype.phys_atk = function() {
        if (this.weapon()) return this.weapon().damage + this.strength
    }

    /**
     * Return the skill the unit has with the specified weapon.  If no weapon
     * is provided, use the equipped weapon.
     * @param {object} weapon
     * @return {number}
     */
    Unit.prototype.weaponSkill(weapon) {
        weapon = weapon || this.weapon();
        if (!weapon) return 0;

        var skill = 0;
        this.skills.forEach(function(value) {
            if (value == "weapon": + weapon.type)
                result++;
        })
    }

    // export Unit prototype
    return Unit;

})