require(["require", "view/ui", "data/namer"], function(require, ui, Namer) {
    // find view target
    var target = document.getElementById("tacdom")
            || document.getElementsByClassName("tacdom")[0]
            || document.getElementsByTagName("body")[0];

    // create a Portal view for the game
    var portal = ui.Portal.create(target);

    // get commander name from user
    var name = Namer.commander();
    require(["stache!/template/text-box"], function(textBox) {
        var markup = textBox({
                caption: "Who leads your warrior band?",
                suggestion: Namer.commander()
            }),
            elem = ui.Portal.element(markup);

        portal.show(elem);
    });
});