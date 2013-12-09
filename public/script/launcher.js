require(["require", "view/ui", "data/namer"], function(require, ui, Namer) {
    // find view target
    var target = document.getElementById("tacdom")
            || document.getElementsByClassName("tacdom")[0]
            || document.getElementsByTagName("body")[0];

    // create a space view for the game
    var space = ui.Space.create(target);

    // get commander name from user
    require(["stache!/template/text-box"], function(textBox) {
        space.show(textBox({
            caption: "Who leads your warrior band?",
            suggestion: Namer.commander()
        }));
    });
});