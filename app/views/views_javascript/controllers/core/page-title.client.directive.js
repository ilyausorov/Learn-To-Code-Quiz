(function () {
  'use strict';

  angular.module('core').directive('pageTitle', pageTitle);

  pageTitle.$inject = ['$rootScope', '$interpolate', '$state'];

  function pageTitle($rootScope, $interpolate, $state) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element) {
      $rootScope.$on('$stateChangeSuccess', listener);

      function listener(event, toState) {
        var applicationCoreTitle = '',
          separator = ' - ',
          stateTitle = applicationCoreTitle;

        toState.name.split('.').forEach(function (value, index) {
          stateTitle = stateTitle + value.charAt(0).toUpperCase() + value.slice(1) + separator;
        });

        if (toState.data && toState.data.pageTitle) {
          stateTitle = $interpolate(toState.data.pageTitle + separator)(($state.$current.locals.globals));
        }
        stateTitle = stateTitle.slice(0, 0 - separator.length);
//        element.text(stateTitle);
		  element.text("Where Should I Learn To Code?");
      }
    }
  }
}());
