define(["wire/component"], function(Component) {

    var Resource = Object.create(Component);

    Resource.uri = "";
    Resource.dirty = null;
    Resource.content = null;

    Resource.create = function(uri) {
        var obj = Object.create(Resource);
        Component.create.call(obj);

        obj.uri = uri;
        obj.content = {};

        obj.on("change", obj.socket("invalidate"));

        return obj;
    }

    Resource.put = function() {
        var req = new XMLHttpRequest({
                url: this.uri,
                method: "put"
            });

        req.setRequestHeader("content-type", "application/json");
        req.send(data);

        if (this.dirty) {
            clearTimeout(this.dirty);
            this.dirty = null;
        }
    }

    Resource.invalidate = function() {
        if (!this.dirty) {
            var resource = this;
            this.dirty = setTimeout(function() {resource.put();}, 0);
        }
    }

});