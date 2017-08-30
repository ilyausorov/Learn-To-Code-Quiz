'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      js: [
        // bower:js
        'public/libraries/jquery/dist/jquery.min.js',
		'public/libraries/angular/angular.js',
        'public/libraries/angular-animate/angular-animate.js',
        'public/libraries/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/libraries/ng-file-upload/ng-file-upload.js',
        'public/libraries/angular-messages/angular-messages.js',
        'public/libraries/angular-mocks/angular-mocks.js',
        'public/libraries/angular-resource/angular-resource.js',
        'public/libraries/angular-ui-notification/dist/angular-ui-notification.js',
        'public/libraries/angular-ui-router/release/angular-ui-router.js',
        'public/libraries/owasp-password-strength-test/owasp-password-strength-test.js',
		'public/libraries/wow/dist/wow.min.js'
        // endbower
      ],
      tests: ['public/libraries/angular-mocks/angular-mocks.js']
    },
    css: [
      'public/css/*.css'
    ],
    less: [
      'public/css/*.less'
    ],
    sass: [
      'public/css/*.scss'
    ],
    js: [
      'app/views/views_javascript/controllers/_config.js',
      'app/views/views_javascript/controllers/_init.js',
      'app/views/views_javascript/controllers/**/*.js',
      'app/views/views_javascript/models/**/*.js'
    ],
    img: [
      'public/images/**/*.jpg',
      'public/images/**/*.png',
      'public/images/**/*.gif',
      'public/images/**/*.svg'
    ],
    views: ['app/views/views_html/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'settings/**/*.js', 'app/controllers/**/*.js', 'app/models/**/*.js', 'app/routes/**/*.js', 'app/sockets/**/*.js', 'app/tests/**/*.js'],
    models: 'app/models/**/*.js',
    routes: 'app/routes/**/*.js',
    sockets: 'app/sockets/**/*.js',
    config: 'app/controllers/**/*.config.js',
    permissions: 'app/controllers/**/*.permission.js',
    views: 'app/views/views_html/basic_layout/*.html'
  }
};
