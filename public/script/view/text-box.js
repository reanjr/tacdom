define(["wire/view", "stache!/template/text-box"], function(View, tpl) {

    var TextBox = Object.create(View);

    TextBox.create = function(elem, caption, suggestion) {
        if (!(elem instanceof HTMLElement)) {
            suggestion = caption, caption = elem, elem = null;
        }

        var obj = (this == TextBox) ? Object.create(TextBox) : this;
        View.create.call(obj, elem, tpl);

        obj.on("change", function() {
            if (this.refresh()) this.addEventListeners();
        });

        obj.set("caption", caption);
        obj.set("suggestion", suggestion);

        return obj;
    }

    TextBox.addEventListeners = function() {
        var textBox = this,
            form = this.elem.getElementsByTagName("form")[0],
            input = this.elem.getElementsByTagName("input")[0];

        input && input.addEventListener("input", function(evt) {
            var val = this.value || textBox.get("suggestion");
            textBox.instanceProps.value = val;
        });

        form && form.addEventListener("submit", function(evt) {
            textBox.emit(input.value);
            evt.preventDefault();
        });
    };

    return TextBox;

});