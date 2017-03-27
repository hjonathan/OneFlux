var express = require('express'),
    app = express(),
    project = "implements",
    argv = require('yargs').argv,
    http = require('http').Server(app);


if (argv.p && argv.p !== "") {
    project = argv.p;
}
app.use(express.static(__dirname + '/' + project + '/build'));

http.listen(4000, function () {
    console.log("App listening on port 4000");
});
