var express = require('express')
  , main = require('./main')
  , map = require('./maproutecontroller')
  , http = require('http')
  , stylus = require('stylus')
  , mongoose = require('mongoose')
  , app = express();
 
// MongoDB
mongoose.connect('mongodb://127.0.0.1/test');
 
mongoose.connection.on('open', function() {
   console.log('Connected to Mongoose');
});
 
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.staticCache({maxObjects: 100, maxLength: 512}));
  app.use(stylus.middleware({
      src: __dirname + '/views'
    , dest: __dirname + '/public'
  }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.directory(__dirname + '/public'));
  app.use(function(req, res, next){
    throw new Error(req.url + ' not found');
  });
  app.use(function(err, req, res, next) {
    console.log(err);
    res.send(err.message);
  });
});
 
app.configure('development', function(){
  app.use(express.errorHandler());
});
 
// top level
app.get('/', main.index);
 
var prefixes = ['cities'];
 
// map route to object controller
prefixes.forEach(function(prefix) {
  map.mapRoute(app, prefix);
});
 
var server = http.createServer(app).listen(3000);
 
server.on('close', function() {
   console.log('terminating server');
   client.quit();
});
 
console.log("Express server listening on port 3000");