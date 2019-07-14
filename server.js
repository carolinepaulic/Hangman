var tinylr,
  request = require('request'),
  express = require('express'),
  app = express(),
  EXPRESS_PORT = 8000,
  EXPRESS_ROOT = __dirname;

app.get('/randomWord', function(req, res) {
  request('http://dictionary.jgefroh.com/word', function(error, response, body) {
    if (!error && response.statusCode === 200) {
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
  var rootDir = EXPRESS_ROOT;
  var isProd = process.argv.slice(2)[0] === 'prod';
  if (isProd) {
    rootDir += '/dist/';
  } else {
    rootDir += '/src/app/';
    app.use('/node_modules',  express.static(EXPRESS_ROOT + '/node_modules'));
  }

  app.use(express.static(rootDir));
  app.listen(EXPRESS_PORT);
  console.log('App listening on port ' + EXPRESS_PORT + (isProd ? ' (Prod)' : ''));
}

//To start, run "node server"
startExpress();
module.exports = app;
