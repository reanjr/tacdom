require(["require", "view/space"], function(require, Space) {
    // find view target
    var target = document.getElementById("tacdom")
            || document.getElementsByClassName("tacdom")[0]
            || document.getElementsByTagName("body")[0];

    // create a space view for the game
    var space = Space.create(target);

    // get commander name from user
    require(["stache!/template/text-box"], function(textBox) {
        space.show(textBox({caption: "What is your commander name?"}));
    });
});