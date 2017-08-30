(function () {
  'use strict';

  angular.module('core').controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$timeout'];

  function HeaderController($scope, $state, Authentication, menuService, $timeout) {
    var vm = this;

	$timeout(function(){
		vm.state = $state.current.name;
		new WOW().init(); 
		var windowElement = document.getElementById("navbarmain");  
		var coolthingElement = document.getElementById("coolthing");
		if (windowElement && coolthingElement) {
			coolthingElement.style.height = (windowElement.offsetWidth * 0.226) + "px";
		}	 
	},600)  
	  
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
	
	 window.addEventListener("resize", function(e) {
		var windowElement = document.getElementById("navbarmain");  
		var coolthingElement = document.getElementById("coolthing");
		if (windowElement && coolthingElement) {
			coolthingElement.style.height = (windowElement.offsetWidth * 0.226) + "px";
		}	 
	 }) 
	vm.gotoFFF = function() {
		if(confirm("Gotcha, didn't I? Well I want to take you to the website of my coding training program for founders called Fullstack Founder Factory. But, you don't have to go... It'll make me sad if you don't, but you don't have to. So you decide!")){
			window.location="https://fullstackfounderfactory.com"	
		}
	}
			  
	vm.navbartoggle = function() {
        var navbarmainElement = document.getElementById("navbarmain");
		var navbarElement = document.getElementById("navbar");
		var stop = Math.round($(window).scrollTop());
	  	if(navbarmainElement){
			if(navbarElement.classList.contains("in")){
				if(stop<=45){
					navbarmainElement.style.backgroundColor = 'transparent';
			  	}
		  	}else{
			  	navbarmainElement.style.backgroundColor = 'rgba(55, 58, 68, 0.95)';
		  	}
	  	}
  	}
	//this function turns the expanded part of the navbar off when you click an option that has the class '.navbar-close', which I added to the options which are an anchor (starting with #)
	$('.close-navbar').click(function(){
        var navbarElement = document.getElementById("navbar");
	  	if(navbarElement){
			if(navbarElement.classList.contains("in")){
				navbarElement.className = "navbar-collapse collapse";
			}
		}
  	})
	//this function controls the scrolling animation when you press an anchor option in the navbar (starting with #)
    $('a[href*="#"]:not([href*="tab"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname){
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    })
	//this function activates every time the window scrolls and when the scroll goes beyond 125 pixels (because mainbottom = 125, but could be anything) it turns on the dark background for the navbar, if certain criteria are met. It also controls the padding around the navbar.
	var mainbottom = 45;
	$(window).on('scroll', function() {
		var stop = Math.round($(window).scrollTop());
		var navbarmainElement = document.getElementById("navbarmain");
		var navbarElement = document.getElementById("navbar");
		if (stop > mainbottom) {
			if(navbarmainElement){
				navbarmainElement.style.backgroundColor = 'rgba(55, 58, 68, 0.95)';
				navbarmainElement.style.padding = '1rem 1.5rem';  
			}
		} else {
			if(navbarElement){
				if(navbarElement.classList.contains("in")){
					if(navbarElement.offsetWidth > 925){
						navbarmainElement.style.padding = '2.5rem 3rem 2.5rem 3rem'; 
					}else{
						navbarmainElement.style.padding = '2.5rem 3rem 2.5rem 3rem'; 
					}
				}else{
					navbarmainElement.style.backgroundColor = 'transparent'; 
					if(navbarmainElement.offsetWidth > 925){
						navbarmainElement.style.padding = '2.5rem 3rem 2.5rem 3rem'; 
					}else{
						navbarmainElement.style.padding = '2.5rem 3rem 2.5rem 3rem'; 
					}
				}
			}
		}
	}); 
  }
}());
