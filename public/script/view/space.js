define(["wire/view"], function(View) {

    var Space = Object.create(View);

    Space.views = [];
    Space.active = null;

    Space.create = function(elem) {
        var obj = (this == Space) ? Object.create(Space) : this;
        View.create.call(obj, elem);

        elem && elem.classList.add("-space");

        // if Space already has content, add it as a view
        var content = obj.elem.innerHTML.trim();
        if (content) {
            obj.elem.innerHTML = "";
            obj.show(content);
        }

        return obj;
    }

    Space.activate = function(view) {
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

    Space.add = function(name, content) {
        var newView = this.createView(content, name);

        this.views.unshift(newView);
        this.trigger("add", newView);
        this.elem.appendChild(newView);

        if (!this.active)
            this.activate(name);
    };

    Space.createView = function(content, name) {
        var container = document.createElement("div");

        container.classList.add("-space-view");
        container.innerHTML = content;

        if (name) container.dataset.name = name;

        return container;
    };

    Space.show = function(content) {
        var newView = this.createView(content),
            activeView = this.active;

        this.views.push(newView);
        this.active = newView;
        this.trigger("activate", newView, activeView);

        newView.classList.add("active");
        if (activeView) activeView.classList.remove("active");
        this.elem.appendChild(newView);
    }

    return Space;

});