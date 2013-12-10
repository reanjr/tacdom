define(["wire/view"], function(View) {

    var Portal = Object.create(View);

    Portal.name = "portal";
    Portal.views = [];
    Portal.active = null;

    /**
     * Construct a Portal.
     * @param {string|HTMLElement} [elem]
     * @returns {Portal}
     */
    Portal.create = function(elem) {
        var obj = (this == Portal) ? Object.create(Portal) : this;
        View.create.call(obj, elem);

        var content = obj.elem.innerHTML.trim();
        if (content) {
            obj.elem.innerHTML = "";
            obj.show(View.element(content));
        }

        return obj;
    }

    /**
     * Active a previously added view.
     * @param {string} view
     */
    Portal.activate = function(view) {
        if (view instanceof String) {
            for (var i in this.views) {
                if (this.views[i].dataset.name == view) {
                    view = this.views[i];
                }
            }
        }

        for (var i in this.views) {
            var view = this.views[i];
            if (view.dataset.name == name) {
                var newView = view,
                    activeView = this.active;

                this.active = newView;
                newView.classList.add("active");
                if (activeView) activeView.classList.remove("active");

                this.trigger("activate", newView, activeView);
                return;
            }
        }
    };

    /**
     * Add a named view.
     * @param {string} name
     * @param {HTMLElement} elem
     */
    Portal.add = function(name, elem) {
        var newView = this.createView(elem, name);

        this.views.unshift(newView);
        this.trigger("add", newView);
        this.elem.appendChild(newView);

        if (!this.active)
            this.activate(name);
    };

    /**
     * Create a new orphaned view.
     * @param {HTMLElement} elem
     * @param {string} [name]
     * @returns {HTMLElement}
     */
    Portal.createView = function(elem, name) {
        var container = document.createElement("div");

        container.classList.add("-space-view");
        container.appendChild(elem);

        if (name) container.dataset.name = name;

        return container;
    };

    /**
     * Display arbitrary content in the Portal.
     * @param {HTMLElement} elem
     */
    Portal.show = function(elem) {
        var newView = this.createView(elem),
            activeView = this.active;

        this.views.push(newView);
        this.active = newView;
        this.trigger("activate", newView, activeView);

        newView.classList.add("active");
        if (activeView) activeView.classList.remove("active");
        this.elem.appendChild(newView);
    }

    return Portal;

});