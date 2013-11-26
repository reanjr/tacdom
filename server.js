var express = require("express"),
    app = express();

app.use(express.static("public"));

app.get("/", function(req, rsp) {
    rsp.redirect("/tactical-domination.html");
});

app.listen(1007);