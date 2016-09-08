var express = require('express');
var app = express();
var request = require('request');

app.use(express.static(__dirname + '/src/app'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/randomWord', function(req, res) {
  request('http://randomword.setgetgo.com/get.php', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json({word: body});
    }
  });
});

app.listen(8080);
console.log("App listening on port 8080");
