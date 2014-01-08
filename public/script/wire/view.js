define(["wire/context"], function(Context) {

    var View = Object.create(Context);

    View.elem = null;
    View.name = "view";
    View.tpl = null;

    View.init = function(elem, tpl) {
        if (arguments.length == 1 && elem instanceof Function) {
            tpl = elem, elem = null;
        }

        Context.init.call(this);

        this.elem = this.prepareElement(elem);
        if (tpl instanceof Function) {
            this.refresh(tpl);
        }
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

    View.refresh = function(tpl) {
        if (tpl instanceof Function) this.tpl = tpl;
        if (this.tpl instanceof Function) {
            this.elem.innerHTML = this.tpl(this.props());
            return true;
        }
    }

    return View;

});