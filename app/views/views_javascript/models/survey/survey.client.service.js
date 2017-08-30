(function () {
  'use strict';

  angular.module('survey.services').factory('SurveyService', SurveyService);
	
  SurveyService.$inject = ['$resource', '$log'];
	
  function SurveyService($resource, $log) {
    var Survey = $resource('/api/survey/:surveyId', {
      surveyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Survey.prototype, {
      createOrUpdate: function () {
        var survey = this;
        return createOrUpdate(survey);
      }
    });
	  
    return Survey;

    function createOrUpdate(survey) {
      if (survey._id) {
        return survey.$update(onSuccess, onError);
      } else {
        return survey.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(survey) {
        return (survey)
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
