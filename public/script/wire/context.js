define(["wire/component"], function(Component) {

    var Context = Object.create(Component);

    Context.instanceProps = {};

    /**
     * Initialize the Context.
     * @param {object} [props]
     */
    Context.init = function(props) {
        this.instanceProps = {};
        for (var prop in props)
            this.instanceProps[prop] = props[prop];
    }

    /**
     * Return the set properties.
     * @returns {object}
     */
    Context.props = function() {
        var props = {};

        for (var prop in this.instanceProps)
            props[prop] = this.instanceProps[prop];

        return props;
    }

    /**
     * Set a property.
     * @param {string} prop
     * @param {*} val
     */
    Context.set = function(prop, val) {
        var old = this.get(prop);

        if (val === old) return;

        this.instanceProps[prop] = val;
        this.trigger("change:" + prop, val, old);
        this.trigger("change", prop, val, old);
    }

    /**
     * Return a property.
     * @param {string} prop
     * @returns {*}
     */
    Context.get = function(prop) {
        return this.instanceProps[prop];
    }

    return Context;

});