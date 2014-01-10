define(function() {

    var Component = Object.create(Object.prototype);

    Component.triggers = {};

    /**
     * Construct a Component.
     * @returns {Component}
     */
    Component.create = function() {
        var obj = Object.create(this);

        if (obj.init instanceof Function)
            obj.init.apply(obj, arguments);

        return obj;
    }

    /**
     * Add event handler.
     * @param {string} event
     * @param {function} call
     */
    Component.on = function(event, call) {
        if (!this.triggers[event])
            this.triggers[event] = [];
        this.triggers[event].push(call);
    };

    /**
     * Trigger an event.
     * @param {string} event
     * @param {...*} args
     */
    Component.trigger = function(event, args) {
        if (this.triggers[event]) {
            var component = this,
                args = Array.prototype.slice.call(arguments, 1);

            this.triggers[event].forEach(function(call) {
                setTimeout(function() {call.apply(component, args)}, 0);
            });
        }
    };

    /**
     * Wire the emit event to a socket.
     * @param {function} socket
     */
    Component.wire = function(socket) {
        this.on("emit", socket);
    }

    /**
     * Emit a value.
     * @param val
     */
    Component.emit = function(val) {
        this.trigger("emit", val);
    }

    /**
     * Trigger an error.
     * @param {string} msg
     * @param {*} data
     */
    Component.error = function(msg, data) {
        this.trigger("error", msg, data);
    }

    /**
     * Create a socket for the specified call and arguments.
     * @param {string} call
     * @param {...*} args
     */
    Component.socket = function(call, args) {
        var component = this,
            args = Array.prototype.slice.call(arguments, 1);

        return function(val) {
            var socketArgs = [];
            for (var i in args) socketArgs.push(args[i]);
            socketArgs.push(val);
            component[call].apply(component, socketArgs);
        };
    }

    return Component;

})