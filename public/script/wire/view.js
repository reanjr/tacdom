define(["wire/component"], function(Component) {

    var View = Object.create(Component);

    View.elem = null;

    View.create = function(elem) {
        var obj = (this == View) ? Object.create(View) : this;
        obj.elem = elem || document.createElement("div");
        return obj;
    }

    return View;

});