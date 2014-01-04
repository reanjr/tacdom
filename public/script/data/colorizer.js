define([], function() {

    function hues(num) {
        if (num < 1) return [];

        var anchor;
        switch (num) {
            case 1:
                return [parseInt(Math.random() * 360)];
            case 2:
                anchor = parseInt(Math.random() * 360);
                return [anchor, (anchor + 180) % 360];
            case 3:
                anchor = parseInt(Math.random() * 360);
                return [anchor, (anchor + 120) % 360, (anchor + 240) % 260];
            case 4:
                return [0, 120, 180, 240];
            default:
                anchor = 360 / num;
                var result = [];
                for (var i = 0; i < num; i++)
                    result.push(parseInt(i * anchor));
                return result;
        }
    }

});