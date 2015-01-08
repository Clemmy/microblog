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
        .state('home', {
          url: '/', //temp change to '/' when i remove other state
          templateUrl: 'views/main.html',
          controller: 'MainCtrl as mainCtrl'
        })
        .state('archive', {
          url: '/archive',
          templateUrl: 'views/archive.html'
        })
        .state('blogs', {
          abstract: true,
          url: '/blogs',
          template: '<ui-view/>'
        })
        .state('blogs.blog', {
          url: '/:blogName/posts',
          templateUrl: 'views/blogs.blog.posts.html',
          controller: 'BlogPostsCtrl as blogPostsCtrl'
        })
      ;


    }
  ]
);

