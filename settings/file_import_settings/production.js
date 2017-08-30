'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      js: [
        // bower:js
        'public/libraries/angular/angular.min.js',
        'public/libraries/angular-animate/angular-animate.min.js',
        'public/libraries/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/libraries/angular-messages/angular-messages.min.js',
        'public/libraries/angular-mocks/angular-mocks.js',
        'public/libraries/angular-resource/angular-resource.min.js',
        'public/libraries/angular-ui-notification/dist/angular-ui-notification.min.js',
        'public/libraries/angular-ui-router/release/angular-ui-router.min.js',
        'public/libraries/jquery/dist/jquery.min.js',
        'public/libraries/ng-file-upload/ng-file-upload.min.js',
        'public/libraries/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/libraries/wow/dist/wow.min.js',
        // endbower
      ]
    },
    css: 'public/dist/application*.min.css',
    js: 'public/dist/application*.min.js'
  }
};
