define(["wire/view", "stache!/template/text-box"], function(View, tpl) {

    var TextBox = Object.create(View);

    TextBox.create = function(elem, caption, suggestion) {
        if (!(elem instanceof HTMLElement)) {
            suggestion = caption, caption = elem, elem = null;
        }

        var obj = (this == TextBox) ? Object.create(TextBox) : this;
        View.create.call(obj, elem, tpl);

        obj.on("change", function() {
            this.refresh();
        });

        obj.set("caption", caption);
        obj.set("suggestion", suggestion);

        return obj;
    }

    return TextBox;

});