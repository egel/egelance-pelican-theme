require('fs').readdirSync(__dirname + '/gulp_src').forEach(function(val) {
    require("./gulp_src/" + val);
});
