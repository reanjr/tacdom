define(["wire/component"], function(Component) {

    var logSocket = Component.socket.call(console, "log");

    return logSocket;

});