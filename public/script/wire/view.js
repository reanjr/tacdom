define(["wire/component", "wire/context"], function(Component, Context) {

    var View = Object.create(Component);

    View.elem = null;
    View.name = "view";

    // mixin Context
    for (var prop in Context)
        if (Context[prop] instanceof Function)
            View[prop] = Context[prop];

    View.create = function(elem, tpl) {
        if (arguments.length == 1 && elem instanceof Function) {
            tpl = elem, elem = null;
        }

        var obj = (this == View) ? Object.create(View) : this;
        Component.create.call(obj);
        Context.create.call(obj);

        obj.elem = this.prepareElement(elem);
        if (tpl instanceof Function) {
            obj.elem.innerHTML = tpl(this.props());
        }

        return obj;
    }

    View.prepareElement = function(markup) {
        var elem = this.element(markup);

        // remove any classes starting with "-"
        for (var cls in elem.classList)
            if (cls[0] == "-")
                elem.classList.remove(cls);

        // assign a "-" class for this view
        if (this.name) elem.classList.add("-" + this.name);

        return elem;
    }

    View.element = function(markup) {
        if (markup instanceof HTMLElement) {
            return markup;
        }

        else if (View.isPrototypeOf(markup)) {
            return markup.elem;
        }

        else if (typeof markup === "string") {
            var result = document.createElement("div");
            result.innerHTML = markup;
            return result;
        }

        else if (markup instanceof DocumentFragment) {
            var result = document.createElement("div");
            result.appendChild(elem);
            return result;
        }

        else {
            return document.createElement("div");
        }
    }

    return View;

});