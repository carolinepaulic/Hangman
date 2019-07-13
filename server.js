var tinylr,
  request = require('request'),
  express = require('express'),
  app = express(),
  EXPRESS_PORT = 8000,
  EXPRESS_ROOT = __dirname,
  LIVERELOAD_PORT = 35729;

app.get('/randomWord', function(req, res) {
  request('http://dictionary.jgefroh.com/word', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body);
      res.json({word: data.word});
    } else {
      res.json({word: 'effervescence'});
    }
  });
});

app.notifyLiveReload = function(event) {
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
};


function startExpress() {
  app.use(require('connect-livereload')());
  app.use(express.static(EXPRESS_ROOT + '/src/app/'));
  app.use('/bower_components',  express.static(EXPRESS_ROOT + '/bower_components'));
  app.listen(EXPRESS_PORT);
  console.log("App listening on port " + EXPRESS_PORT);
}

function startLiveReload() {
  tinylr = require('tiny-lr')();
  tinylr.listen(LIVERELOAD_PORT);
  console.log("Live reload listening on port " + LIVERELOAD_PORT);
}

//To start, run "node server"
startExpress();
startLiveReload();
module.exports = app;
