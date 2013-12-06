define(function() {

    var Component = Object.create(Object.prototype);

    Component.triggers = {};

    Component.create = function() {
        var obj = (this == Component) ? Object.create(Component) : this;
        return obj;
    }

    Component.on = function(event, call) {
        if (!this.triggers[event])
            this.triggers[event] = [];
        this.triggers.push(call);
    };

    Component.trigger = function(event) {
        if (this.triggers[event]) {
            var that = this,
                args = Array.prototype.slice.call(arguments, 1);

            this.triggers[event].forEach(function(call) {
                setTimeout(function() {call.apply(that, args)}, 0);
            });
        }
    };

    return Component;

})