define(function() {

    /**
     * Merge the properties of the source object into the target.
     */
    function merge(target, source) {
        for (var i in source)
            target[i] = source[i];
    }

    /**
     * Extend the first object with the provided prototype.  If the prototype
     * is a function, treat it as a constructor with the provided arguments.
     * @param {object} obj
     * @param {object} proto
     * @param {array} args
     */
    function extend(obj, proto, args) {
        if (proto instanceof Function)
            proto.apply(obj, args);
        obj.prototype = proto;
    }

    /**
     * Work with lists.
     * @param {array} list
     * @constructor
     */
    function List(list) {

    }

    /**
     * Model constructor.
     * @param {object} props
     * @constructor
     */
    function Model(props) {
        var observers = [],
            observed = {};

        // set the model properties to match the observed properties
        for (var name in props) {
            this[name] = props[name];
            observed[name] = props[name];
        }

        /**
         * Attach an observer to this model.  If props are provided, only notify
         * the observer when the specified properties change.  The observer will
         * be notified once per property.
         * @param {object} observer
         * @param {array} props
         */
        function observe(observer, props) {
            props = props || [];
            observers.push([observer, props]);
        }

        /**
         * Notify observers of any changes to the model.
         */
        function change() {
            var notifyAny = [],
                notifyProps = {},
                changed = [],
                changes = {},
                that = this;

            // first identify changes; no changes means nothing to notify about
            Array.prototype.forEach.call(that, function(v, prop) {
                if (v != observed[prop]) changed.push(prop);
            });
            if (changed.length == 0) return;

            // next identify what changes observers need to be made aware of
            observers.forEach(function(info) {
                var observer = info[0],
                    props = info[1];
                if (props.length == 0) notifyAny.push(observer);
                else props.forEach(function(prop) {
                    if (!notifyProps[prop]) notifyProps[prop] = [];
                    notifyProps[prop].push(observer);
                });
            });

            // build object containing the old values of changed properties
            changed.forEach(function(prop) {
                changes[prop] = observed[prop];
            });

            // notify observers about object changes
            notifyAny.forEach(function(observer) {
                observer(changes, that);
            });

            // notify observers about individual property changes
            Array.prototype.forEach.call(notifyProps, function(observers, prop) {
                observers.forEach(function(observer) {
                    observer(that[prop], observed[prop], prop, that);
                })
            });

            // now update the observed properties to match the model
            for (i in this) observed[i] = this[i];
        }
    }

    function ModelObserver() {
        var PER_CALL_LIMIT = 500,
            models = [],
            index = 0,
            observeTimer = null;

        /**
         * Begin watching for changes.  Chained.
         */
        this.observe = function() {
            var c = 0,
                model = null;

            while (index+c < PER_CALL_LIMIT && index < models.length) {
                model = models[index];
                model.change();
                index++;
            }

            observeTimer = setTimeout(this.observe, 0);

            return this;
        }

        /**
         * Stop watching for changes.  Chained.
         */
        this.pause = function() {
            clearTimeout(observeTimer);
            return this;
        }
    }

    // export module
    return {
        extend: extend,
        merge: merge,
        models: (new ModelObserver()).observe(),
        Model: Model
    };

})