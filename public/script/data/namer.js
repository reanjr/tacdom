define(function() {

    var unitNames = ["Anje", "Botel", "Cai", "Divert", "Eddy", "Frid", "Gerd",
            "Helje", "Ingeleiv", "Jani", "Kay", "Lind", "Marjan", "Nikita",
            "Otta", "Ragnild", "Sandi", "Telli", "Une", "Vanja"],
        unitTitles = ["Commander", "Lieutenant", "Captain", "Lord", "General",
            "Prophet", "Bror", "Søster", "Far", "Mor", "Master",
            "Hans Hellighet", "Hennes Hellighet"],
        unitEpithets = ["Longtail", "Langhalen", "Longtooth", "Langtann",
            "the Spotted", "den Flekket", "the Brown", "den Brune",
            "the Painted", "Malt", "the Great", "den Store", "the Fierce",
            "Hard", "the Mighty", "den Mektige", "Kongen av Konger",
            "Dronning av Dronninger"];

    function random(arr) {
        var index = parseInt(Math.random() * arr.length),
            result = arr[index];
        return result;
    }

    function flip() {
        var result = Math.random() > 0.5;
        return result;
    }

    return {
        unit: function() {
            var title = flip() ? random(unitTitles) : "",
                epithet = title ? "" : random(unitEpithets),
                name = (title ? title + " " : "") + random(unitNames) +
                    (epithet ? " " + epithet : "");
            return name;
        }
    }

})