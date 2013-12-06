require(["view/space"], function(Space) {
    // find view target
    var target = document.getElementById("tacdom")
            || document.getElementsByClassName("tacdom")[0]
            || document.getElementsByTagName("body")[0];

    // create a space view for the game
    var space = Space.create(target);
});