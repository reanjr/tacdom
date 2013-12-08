var express = require("express"),
    redis = require("redis").createClient(),
    RedisStore = require("connect-redis")(express),
    app = express();

// send redis errors to console
redis.on("error", function(err) {
    console.error(err);
});

// default configuration
app.set("port", 1007);

// serve static assets from public folder
app.use(express.static("public"));

// enable cookies
app.use(express.cookieParser());

// session middle-ware using redis for storage
app.use(express.session({
    secret: "the secret ingredient is love, dammit",
    store: new RedisStore({client: redis})
}));

// enable parsed post data
app.use(express.bodyParser());

// redirect homepage to appropriate static asset
app.get("/", function(req, rsp) {
    rsp.redirect("/tacdom.html");
});

// unit data
app.get("/unit/:id", function(req, rsp) {
    var host = req.headers.host + ":" + app.get("port"),
        baseUri = "//" + host;

    redis.hgetall(baseUri + req.url, function(err, reply) {
        if (err) {
            rsp.status(404);
            rsp.end();
        } else {
            rsp.setHeader("Content-Type", "application/json");
            rsp.end(JSON.stringify(reply));
        }
    });
});

// create a new commander for the current session
app.post("/commander", function(req, rsp) {
    var host = req.headers.host + ":" + app.get("port"),
        baseUri = "//" + host,
        idUri = "/id",
        name = req.body.name,
        commander = {
            id: null, uri: "/unit/", name: name,
            job: "commander",
            hea: 10, atk: 2, def: 2, spd: 2,
            hp: 10, act: 2,
            weap_dmg: 1, weap_rng: 1,
            special: "command"
        };

    if (!name) {
        rsp.status(500);
        rsp.end();
        return;
    }

    redis.incr(baseUri + idUri, function(err, reply) {
        // TODO: handle err
        commander.id = reply;
        commander.uri += reply;
        redis.hmset(baseUri + commander.uri, commander, function(err, reply) {
            // TODO: handle err
            rsp.redirect(303, commander.uri);
        });
    });
});

// begin listening
app.listen(app.get("port"));