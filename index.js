var args = process.argv.slice(2);
var host = 'localhost';
if (args.length !== 0) {
    host = args[0];
}

var express = require('express');
var app = express();

app.get('/playvideo', function (req, res) {
    var exec = require('child_process').exec;
    exec('omxplayer $(youtube-dl -g "' + req.query.url + '")', 
      function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    res.send('Hello World');
})

var server = app.listen(3000, host, function () {
    var exec = require('child_process').exec;
    var hostname = server.address().address;
    var port = server.address().port
    console.log('Node app listening at http://%s:%s', hostname, port)
});

