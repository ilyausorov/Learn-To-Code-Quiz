'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var app = require(path.resolve('./settings/common_files/app'));

app.init(function () {
  console.log('Initialized test automation');
});
