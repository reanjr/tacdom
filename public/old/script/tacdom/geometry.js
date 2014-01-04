define(function() {

    /**
     * Initialize a new n-dimensional vector or a new vector with given coords.
     * @param {Number|Number[]} size
     */
    function Vector(size) {
        var coords = size instanceof Array ? size : [],
            size = size instanceof Array ? size.length : parseInt(size);

        if (coords.length == 0) for(var i = 0; i < size; i++) coords.push(0);

        /**
         * Return the size of the vector.
         * @return {Number}
         */
        this.size = function() {
            return size;
        }

        /**
         * Set or return a vector coordinate.
         * @param {Number} ordinal
         * @param {Number} [value]
         */
        this.value = function(ordinal, value) {
            if (ordinal < 0 || ordinal >= size) return;
            if (arguments.length > 1)
                coords[ordinal] = parseInt(value);
            else
                return coords[ordinal];
        }
    }

    /**
     * Initialize a new 2-dimensional vector with given coordinates.
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     */
    function Vector2d(x, y) {
        x = parseInt(x) || 0;
        y = parseInt(y) || 0;
        Vector.call(this, [x, y]);

        /**
         * Return the value of the first coordinate.
         * @return {Number}
         */
        this.x = function() {
            return this.value(0);
        }

        /**
         * Return the value of the second coordinate.
         * @return {Number}
         */
        this.y = function() {
            return this.value(1);
        }
    }

    /**
     * Initialize a new 3-dimensional vector with given coordinates.
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [z=0]
     */
    function Vector3d(x, y, z) {
        x = parseInt(x) || 0;
        y = parseInt(y) || 0;
        z = parseInt(z) || 0;
        Vector.call(this, [x, y, z]);

        /**
         * Return the value of the first coordinate.
         * @return {Number}
         */
        this.x = function() {
            return this.value(0);
        }

        /**
         * Return the value of the second coordinate.
         * @return {Number}
         */
        this.y = function() {
            return this.value(1);
        }

        /**
         * Return the value of the third coordinate.
         * @return {Number}
         */
        this.z = function() {
            return this.value(2);
        }
    }

})