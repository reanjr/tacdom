define(["wire/component"], function(Component) {

    var Collection = Object.create(Component);

    Collection.uri = "";
    Collection.proto = null;

    /**
     * Initialize the Collection.
     * @param {string} uri
     * @param {object} proto
     */
    Collection.init = function(uri, proto) {
        this.uri = uri;
        this.proto = proto;
    }

    /**
     * Post resource to the Collection.
     * @param {object} resource
     */
    Collection.post = function(resource) {
        var req = new XMLHttpRequest();

        req.open("POST", this.uri);
        req.setRequestHeader("Content-Type", "application/json");
        req.addEventListener("load", function(evt) {

        });
        req.addEventListener("error", function(evt) {

        });
        req.addEventListener("abort", function(evt) {

        });
        req.send(resource);
    }

    /**
     * Create a resource from the Collection prototype.
     * @param {object} data
     * @returns {object}
     */
    Collection.createResource = function(data) {
        var proto = this.proto,
            res;

        if (proto.create instanceof Function) {
            res = proto.create(data);
        } else {
            res = Object.create(proto);
            for (var i in data) res[i] = data[i];
        }

        return res;
    }

    return Collection;

});