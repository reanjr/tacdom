define(["wire/component"], function(Component) {

    var Context = Object.create(Component);

    Context.instanceProps = {};

    Context.init = function(props) {
        this.instanceProps = {};
        for (var prop in props)
            this.instanceProps[prop] = props[prop];
    }

    Context.props = function() {
        var props = {};

        for (var prop in this.instanceProps)
            props[prop] = this.instanceProps[prop];

        return props;
    }

    Context.set = function(prop, val) {
        var old = this.get(prop);

        if (val === old) return;

        this.instanceProps[prop] = val;
        this.trigger("change:" + prop, val, old);
        this.trigger("change", prop, val, old);
    }

    Context.get = function(prop) {
        return this.instanceProps[prop];
    }

    return Context;

});