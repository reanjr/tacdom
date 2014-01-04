require(["core", "tacdom/unit"], function(core, Unit) {

    function Soldier() {
        core.extend(this, Unit);

        this.speed = 2;
    }

});