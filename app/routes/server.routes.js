'use strict';

/**
 * Module dependencies
 */
var adminPermission = require('../controllers/admin/admin.server.permission'),
  admin = require('../controllers/admin/admin.server.controller');

var questionsPermission = require('../controllers/questions/questions.server.permission'),
  questions = require('../controllers/questions/questions.server.controller');

var surveyPermission = require('../controllers/survey/survey.server.permission'),
  survey = require('../controllers/survey/survey.server.controller');

var passport = require('passport');

module.exports = function (app) {
	
 // User Routes
  var users = require('../controllers/users/users.server.controller');

  // Setting up the users profile api
  app.route('/api/users/me').get(users.me);
  app.route('/api/users').put(users.update);
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/password').post(users.changePassword);
  app.route('/api/users/picture').post(users.changeProfilePicture);

  // Finish by binding the user middleware
  app.param('userId', users.userByID);	
	
  // User route registration first. Ref: #713
//  require('./users.server.routes.js')(app);

  // Users collection routes
  app.route('/api/users')
    .get(adminPermission.isAllowed, admin.list);

  // Single user routes
  app.route('/api/users/:userId')
    .get(adminPermission.isAllowed, admin.read)
    .put(adminPermission.isAllowed, admin.update)
    .delete(adminPermission.isAllowed, admin.delete);

  // Finish by binding the user middleware
  app.param('userId', admin.userByID);
	
  //survey collection routes
  app.route('/api/survey').all(surveyPermission.isAllowed)
    .get(survey.list)
    .post(survey.create);

  // Single survey routes
  app.route('/api/survey/:surveyId').all(surveyPermission.isAllowed)
    .get(survey.read)
    .put(survey.update)
    .delete(survey.delete);	
	
  // Finish by binding the article middleware
  app.param('surveyId', survey.surveyByID);
	
	
 // Questions collection routes
  app.route('/api/questions').all(questionsPermission.isAllowed)
    .get(questions.list)
    .post(questions.create);
	
  // Single question routes
  app.route('/api/questions/:questionId').all(questionsPermission.isAllowed)
    .get(questions.read)
    .put(questions.update)
    .delete(questions.delete);

  // Finish by binding the question middleware
  app.param('questionId', questions.questionByID);
	
	
	
 // User Routes
  var users = require('../controllers/users/users.server.controller');

  // Setting up the users password api
  app.route('/api/auth/forgot').post(users.forgot);
  app.route('/api/auth/reset/:token').get(users.validateResetToken);
  app.route('/api/auth/reset/:token').post(users.reset);

  // Setting up the users authentication api
  app.route('/api/auth/signup').post(users.signup);
  app.route('/api/auth/signin').post(users.signin);
  app.route('/api/auth/signout').get(users.signout);

  // Setting the facebook oauth routes
  app.route('/api/auth/facebook').get(users.oauthCall('facebook', {
    scope: ['email']
  }));
	
  app.route('/api/auth/facebook/callback').get(users.oauthCallback('facebook'));

  // Setting the twitter oauth routes
  app.route('/api/auth/twitter').get(users.oauthCall('twitter'));
  app.route('/api/auth/twitter/callback').get(users.oauthCallback('twitter'));

  // Setting the google oauth routes
  app.route('/api/auth/google').get(users.oauthCall('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));
  app.route('/api/auth/google/callback').get(users.oauthCallback('google'));

  // Setting the linkedin oauth routes
  app.route('/api/auth/linkedin').get(users.oauthCall('linkedin', {
    scope: [
      'r_basicprofile',
      'r_emailaddress'
    ]
  }));
	
  app.route('/api/auth/linkedin/callback').get(users.oauthCallback('linkedin'));

  // Setting the github oauth routes
  app.route('/api/auth/github').get(users.oauthCall('github'));
  app.route('/api/auth/github/callback').get(users.oauthCallback('github'));

  // Setting the paypal oauth routes
  app.route('/api/auth/paypal').get(users.oauthCall('paypal'));
  app.route('/api/auth/paypal/callback').get(users.oauthCallback('paypal'));

 // Root routing
  var core = require('../controllers/core/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);	
	
};
