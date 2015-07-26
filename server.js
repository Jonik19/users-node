'use strict';

var config = require('./config');
var routes = require('./routes');
var app = require('express')();

routes.init(app);

app.listen(config.port, function () {
  console.log('Server listening on *'+config.port);
});




