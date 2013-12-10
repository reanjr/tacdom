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
        this.triggers[event].push(call);
    };

    Component.trigger = function(event) {
        if (this.triggers[event]) {
            var component = this,
                args = Array.prototype.slice.call(arguments, 1);

            this.triggers[event].forEach(function(call) {
                setTimeout(function() {call.apply(component, args)}, 0);
            });
        }
    };

    Component.wire = function(call, thisArg) {
        var handler = thisArg
            ? function() {call.apply(thisArg, arguments)}
            : call;
        this.on("emit", handler);
    }

    Component.emit = function(val) {
        this.trigger("emit", val);
    }

    return Component;

})