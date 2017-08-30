(function (app) {
  'use strict';

  app.registerModule('questions', ['core']);
  app.registerModule('questions.admin', ['core.admin']);
  app.registerModule('questions.admin.routes', ['core.admin.routes']);
  app.registerModule('questions.services');
}(ApplicationConfiguration));
