define(["wire/component"], function(Component) {

    var Context = Object.create(Component);

    Context.instanceProps = {};

    Context.create = function(props) {
        var obj = (this == Context) ? Object.create(Context) : this;

        obj.instanceProps = {};
        for (var prop in props)
            obj.instanceProps[prop] = props[prop];

        return obj;
    }

    Context.props = function() {
        var proto = Object.getPrototypeOf(this),
            vals = (proto.all instanceof Function) ? proto.all() : {};

        for (var prop in this.instanceProps)
            vals[prop] = this.instanceProps[prop];

        return vals;
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