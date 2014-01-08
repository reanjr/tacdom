define(["wire/view", "stache!/template/text-box"], function(View, tpl) {

    var TextBox = Object.create(View);

    /**
     * Initialize the TextBox.
     * @param {HTMLElement} [elem]
     * @param {string} caption
     * @param {string} [suggestion]
     */
    TextBox.init = function(elem, caption, suggestion) {
        if (!(elem instanceof HTMLElement)) {
            suggestion = caption, caption = elem, elem = null;
        }

        View.init.call(this, elem, tpl);

        this.on("change", function() {
            if (this.refresh()) this.addEventListeners();
        })

        this.set("caption", caption);
        this.set("suggestion", suggestion);
    }

    /**
     * Attach event listeners to the document view.
     */
    TextBox.addEventListeners = function() {
        var textBox = this,
            form = this.elem.getElementsByTagName("form")[0],
            input = this.elem.getElementsByTagName("input")[0];

        input && input.addEventListener("input", function(evt) {
            var val = this.value || textBox.get("suggestion");
            textBox.instanceProps.value = val;
        });

        form && form.addEventListener("submit", function(evt) {
            textBox.emit(textBox.get("value") || textBox.get("suggestion"));
            evt.preventDefault();
        });
    };

    return TextBox;

});