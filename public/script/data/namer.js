define(function() {

    var unitNames = ["Anje", "Botel", "Cai", "Divert", "Eddy", "Frid", "Gerd",
            "Helje", "Ingeleiv", "Jani", "Kay", "Lind", "Marjan", "Nikita",
            "Otta", "Ragnild", "Sandi", "Telli", "Une", "Vanja"],
        unitTitles = ["Commander", "Fenrik", "Major", "General", "Lord", "Lady",
            "Prophet", "Bror", "Søster", "Far", "Mor", "Master",
            "Hans Hellighet", "Hennes Hellighet"],
        unitEpithets = ["Longtail", "Langhalen", "Longtooth", "Langtann",
            "the Spotted", "den Flekket", "the Brown", "den Brune",
            "the Painted", "Malt"],
        unitHonorifics = ["the Great", "den Store", "the Fierce", "Hard",
            "the Mighty", "den Mektige", "Kongen av Konger",
            "Dronning av Dronninger"];

    function random(arr) {
        var index = parseInt(Math.random() * arr.length),
            result = arr[index];
        return result;
    }

    function randint(min, max) {
        return parseInt(Math.random() * (max - min)) + min;
    }

    function name() {
        return random(unitNames);
    }

    function epithetName() {
        return name() + " " + random(unitEpithets);
    }

    function honorificName() {
        return name() + " " + random(unitHonorifics);
    }

    function titleName() {
        return random(unitTitles) + " " + name();
    }

    function commanderName() {
        switch (randint(1,4)) {
            case 1: return name();
            case 2: return epithetName();
            case 3: return honorificName();
            default: return titleName();
        }
    }

    return {
        commander: commanderName,
        unit: name
    }

})