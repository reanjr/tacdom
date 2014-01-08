require(["view/ui", "data/namer"], function(ui, Namer) {
    // find view target
    var target = document.getElementById("tacdom")
            || document.getElementsByClassName("tacdom")[0]
            || document.getElementsByTagName("body")[0];

    // create a Portal view for the game
    var portal = ui.Portal.create(target);

    // create interface to get commander name from user
    var name = Namer.commander(),
        input = ui.TextBox.create("Who leads your warrior band?", name);

    // display the user prompt
    portal.show(input.elem);
});