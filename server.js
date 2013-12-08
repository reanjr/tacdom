var express = require("express"),
    redis = require("redis").createClient(),
    RedisStore = require("connect-redis")(express),
    app = express();

// send redis errors to console
redis.on("error", function(err) {
    console.error(err);
});

// serve static assets from public folder
app.use(express.static("public"));

// enable cookies
app.use(express.cookieParser());

// session middle-ware using redis for storage
app.use(express.session({
    secret: "the secret ingredient is love, dammit",
    store: new RedisStore({client: redis})
}));

// redirect homepage to appropriate static asset
app.get("/", function(req, rsp) {
    rsp.redirect("/tacdom.html");
});

// begin listening
app.listen(1007);