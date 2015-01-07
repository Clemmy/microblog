'use strict';
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])

  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('hometemp', {
          url: '/',
          template: '<p class="lead">{{ title }}</p>' +
          '<p>Use the menu above to navigate. ' +
          'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
          '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
          '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>',
          controller: function($scope){
            $scope.title = 'My Contacts';
          }
        })
        .state('home', {
          url: '/home', //temp change to '/' when i remove other state
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          controllerAs: 'main'
        })
        .state('archive', {
          url: '/archive',
          templateUrl: 'views/archive.html'
        });
    }
  ]
);

