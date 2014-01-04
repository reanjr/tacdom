define(function() {

    function Map() {
        var size = 0;

        this.seaLevel = -3;
        this.tiles = [];

        this.changeSize(s) {
            size = parseInt(s) || 1;
            if (size < 1) size = 1;

            var requiredTiles = Math.pow(size*2-1, 2);

            // add tiles if we don't have enough
            while (this.tiles.length < requiredTiles) this.tiles.push(new Tile());

            // remove tiles if we have too many
            while (this.tiles.length > requiredTiles) this.tiles.pop();
        }
    }

    /**
     * Create a new Tile.
     * @constructor
     */
    function Tile() {
        this.height = 0;
        this.terrain = Terrain.LEVEL;
    }

    /**
     * Create a new Terrain.
     * @constructor
     */
    function Terrain() {
    }

    Terrain.ROAD = "road"
    Terrain.LEVEL = "level";
    Terrain.ROUGH = "rough";
    Terrain.RUGGED = "rugged";

    // export module
    return {
        Map: Map,
        Tile: Tile,
        Terrain: Terrain
    };

})