'use strict';
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngUpload'
  ])

  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url : '/',
          templateUrl : 'app/views/main.html',
          controller : 'MainCtrl as mainCtrl',
          resolve : {
            blogsPromise : ['blogs', function(blogs){
              return blogs.getAll();
            }]
          }
        })
        .state('archive', {
          url: '/archive',
          templateUrl : 'app/views/archive.html',
          controller : 'ArchiveCtrl as archCtrl',
          resolve : {
            blogsPromise : ['blogs', function(blogs){
              return blogs.getAllWithPopulatedPosts();
            }]
          }
        })
        .state('blogPosts', {
          url : '/blogs/:blogName/posts',
          templateUrl : 'app/views/blogPosts.html',
          controller : 'BlogPostsCtrl as blogPostsCtrl',
          resolve : {
            postsPromise : ['posts', '$stateParams', function(posts, $stateParams) {
              return posts.getAllPostsFromBlog($stateParams.blogName);
            }]
          }
        })
        .state('post', {
          url : '/blogs/:blogName/posts/:postId',
          templateUrl : 'app/views/post.html',
          controller : 'PostCtrl as postCtrl',
          resolve : {
            requestedPost : ['posts', '$stateParams', function(posts, $stateParams) { //rename to postPromise
              return posts.getPostFromIdAndBlogName($stateParams.postId, $stateParams.blogName);
            }]
          }
        })
      ;
    }
  ])
 ;

