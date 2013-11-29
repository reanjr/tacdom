require([], function() {
    // find view target
    var target = document.getElementById("tacdom")
            || document.getElementsByClassName("tacdom")[0]
            || document.getElementsByTagName("body")[0];

    if (!target) console.error("could not identify view target");
    else console.log(target);
});