var WebApplication3 = angular.module('WebApplication3', ['ui.router', 'ui.bootstrap']);

WebApplication3.controller('LandingPageController', LandingPageController);
WebApplication3.controller('LoginController', LoginController);
WebApplication3.controller('RegisterController', RegisterController);
WebApplication3.factory('AuthHttpResponseInterceptor', AuthHttpResponseInterceptor);
WebApplication3.factory('LoginFactory', LoginFactory);
WebApplication3.factory('RegistrationFactory', RegistrationFactory);

var configFunction = function ($stateProvider, $httpProvider, $locationProvider) {
  $locationProvider.hashPrefix('!').html5Mode(true);
  $stateProvider
      .state('stateOne', {
        url: '/stateOne?donuts',
        views: {
          "containerOne": {
            templateUrl: '/routesDemo/one'
          },
          "containerTwo": {
            templateUrl: function (params) { return '/routesDemo/two?donuts=' + params.donuts; }
          },
          "nestedView@stateOne": {
            templateUrl: '/routesDemo/four'
          }
        }
      })
      .state('stateTwo', {
        url: '/stateTwo',
        views: {
          "containerOne": {
            templateUrl: '/routesDemo/one'
          },
          "containerTwo": {
            templateUrl: '/routesDemo/three'
          }
        }
      })
      .state('stateThree', {
        url: '/stateThree?donuts',
        views: {
          "containerOne": {
            templateUrl: function (params) { return '/routesDemo/two?donuts=' + params.donuts; }
          },
          "containerTwo": {
            templateUrl: '/routesDemo/three'
          }
        }
      })
      .state('login', {
        url: '/login?returnUrl',
        views: {
          "containerOne": {
            templateUrl: '/Account/Login',
            controller: LoginController
          }
        }
      })
      .state('register', {
        url: '/register',
        views: { 
          "containerTwo": {
            templateUrl: '/Account/Register',
            controller: RegisterController
          }
        }
      });

  $httpProvider.interceptors.push('AuthHttpResponseInterceptor');
}
configFunction.$inject = ['$stateProvider', '$httpProvider', '$locationProvider'];

WebApplication3.config(configFunction);