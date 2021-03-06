(function () {
  'use strict';

  angular.module('core.routes').config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/app/views/views_html/core/home.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',
		resolve: {
          surveyResolve: newSurvey
        }
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: '/app/views/views_html/core/404.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: '/app/views/views_html/core/400.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: '/app/views/views_html/core/403.client.view.html',
        data: {
          ignoreState: true
        }
      });
  }
	
  newSurvey.$inject = ['SurveyService'];
	
  function newSurvey(SurveyService) {
    return new SurveyService({survey:[]});
  }
	
}());
