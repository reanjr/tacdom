var require = {
    baseUrl: "/script",
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
    },
    paths: {
        "domReady": "//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady",
        "i18n": "//cdnjs.cloudflare.com/ajax/libs/require-i18n/2.0.4/i18n",
        "text": "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text",
        "stache": "//cdnjs.cloudflare.com/ajax/libs/requirejs-mustache/0.0.2/stache",
        "ember": "//cdnjs.cloudflare.com/ajax/libs/ember.js/1.1.2/ember.min",

        "backbone": "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min",
        "underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min",
        "hbars": "//cdnjs.cloudflare.com/ajax/libs/requirejs-handlebars/0.0.2/hbars",
        "jquery": "//cdnjs.cloudflare.com/ajax/libs/require-jquery/0.25.0/require-jquery.min",
        "tpl": "//cdnjs.cloudflare.com/ajax/libs/requirejs-tpl/0.0.2/tpl"
    }
}