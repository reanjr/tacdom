define(["wire/continuation"], function(Continuation) {

    var Request = Object.create(Object.prototype);

    Request.INFORMATIONAL = 100;
    Request.SUCCESS = 200;
    Request.REDIRECTION = 300;
    Request.CLIENT_ERROR = 400;
    Request.SERVER_ERROR = 500;

    Request.method = "GET";
    Request.uri = "";
    Request.headers = {};
    Request.data = null;

    /**
     * Initialize the Request.
     * @param {object} props
     */
    Request.init = function(props) {
        for (var prop in props)
            this[prop] = props[prop];
    }

    /**
     * Make a post request.
     * @param {string} [uri]
     * @param {object} data
     * @param {object} headers
     * @returns {Continuation}
     */
    Request.post = function(uri, data, headers) {
        if (typeof uri === "object") {
            headers = data, data = uri, uri = null;
        }

        return this.send("POST", uri, headers, data);
    }

    /**
     * Send a request.
     * @param {string} method
     * @param {string} uri
     * @param {object} headers
     * @param {*} data
     * @returns {Continuation}
     */
    Request.send = function(method, uri, headers, data) {
        var req = new XMLHttpRequest(),
            cont = Continuation.create();

        uri = uri || this.uri || window.location;
        headers = headers || this.headers;
        data = data || this.data;

        req.addEventListener("load", function(evt) {
            if (Request.stat(evt.status) == Request.SUCCESS) {
                cont.emit(evt.responseText);
            } else {
                cont.error("request error", evt);
            }
        });

        req.addEventListener("error", function(evt) {
            cont.error("request error", evt);
        });

        req.addEventListener("abort", function(evt) {
            cont.error("request canceled", evt);
        });

        req.open(method, uri);
        for (var header in headers)
            req.setRequestHeader(header, headers[header]);
        req.send(data);

        return cont;
    };

    /**
     * Return the status class from the status code.
     * @param {int} status
     * @returns {int}
     */
    Request.stat = function(status) {
        status = parseInt(status);

        if (isNaN(status) || status < 100 || status >= 600) return 0;

        return Math.floor(status / 100) * 100;
    }

});