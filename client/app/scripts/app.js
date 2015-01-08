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
          templateUrl : 'views/main.html',
          controller : 'MainCtrl as mainCtrl'
        })
        .state('archive', {
          url: '/archive',
          templateUrl : 'views/archive.html'
        })
        //.state('blogs', {
        //  abstract : true,
        //  url : '/blogs',
        //  template : '<ui-view/>'
        //})
        .state('blogPosts', {
          url : '/blogs/:blogName/posts',
          templateUrl : 'views/blogPosts.html',
          controller : 'BlogPostsCtrl as blogPostsCtrl'
        })
        .state('post', {
          url : '/blogs/:blogName/posts/:postTitle',
          templateUrl : 'views/post.html',
          controller : 'PostCtrl as postCtrl'
        })
      ;
    }
  ]
);

