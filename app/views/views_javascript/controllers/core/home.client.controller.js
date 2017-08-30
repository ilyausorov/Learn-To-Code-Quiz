(function () {
  'use strict';

  angular.module('core').controller('HomeController', HomeController);

  HomeController.$inject = ['$scope','QuestionsService','$timeout','surveyResolve', 'SurveyService'];	
	
  function HomeController($scope,QuestionsService, $timeout, survey, SurveyService) {
    var vm = this;
	   
	vm.questions = []; 
	vm.survey_started=false;
	vm.current_question=1;
	vm.survey_done=false;
	vm.loading=false;
	vm.info_submitted=false;
	vm.in_progress=false;
	 
    vm.loadquestions = function(){ 
	  vm.survey = angular.copy(survey);
	  vm.survey_started=true;
	  vm.survey_done=false;
      vm.info_submitted=false;
	  vm.current_question=1;
      QuestionsService.query().$promise.then(function(jdata){
	  	vm.questions=jdata;
	    $timeout(function(){
			smoothScroll("anchorQuestions")		 
				 },500)
		  
		  
	  });	
    }
	
	vm.chooseAnswer = function(current_question, given_answer, num){
		
	  if(vm.in_progress){ return }	
	  vm.in_progress = !vm.in_progress;
	  var answer = {
		  question: current_question,
		  answer: given_answer,
		  value: num
	  }
	  
	  vm.survey.survey.push(answer);
		
	  if(vm.current_question == vm.questions.length){
		  vm.survey.finished = new Date();
	  }	
		
	  vm.survey.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
		SurveyService.get({
      		surveyId: res._id
    	}).$promise.then(function(jdata){
			vm.survey = jdata;
			vm.current_question+=1;
			smoothScroll("anchorQuestions");
			vm.in_progress = !vm.in_progress;
			if(vm.current_question > vm.questions.length){
				vm.survey_started=false;
				vm.survey_done=true;
				vm.loading=true;
				
				$timeout(function(){
					smoothScroll("finished");
					vm.loading=false;
				},3500)
				
			}		
		})
      }

      function errorCallback(res) {
        console.log("We messed up...")
      }	
	}
	
	
	vm.save = function(){
		
	  vm.survey.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
		SurveyService.get({
      		surveyId: res._id
    	}).$promise.then(function(jdata){
			vm.survey = jdata;
			
			vm.info_submitted=true;
				
			})		
		}
     
      function errorCallback(res) {
        console.log("We messed up...")
      }	
	}
	
	
	new WOW().init();
		//this function controls the scrolling animation when you press an anchor option in the navbar (starting with #)
    $('a[href*="#"]:not([href*="tab"])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	function smoothScroll(hash) {
		var targetElement = document.getElementById(hash);
		$('html, body').animate({
			scrollTop: targetElement.offsetTop
		}, 1500);
	}
	  
	vm.close = function() {
		$('html, body').animate({
			scrollTop: '0px'
		}, 0);
		vm.questions = []; 
		vm.survey_started=false;
		vm.current_question=1;
		vm.survey_done=false;
		vm.loading=false;
		vm.info_submitted=false;
	}
	
	
  }
}());