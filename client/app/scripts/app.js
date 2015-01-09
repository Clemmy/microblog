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
          templateUrl : 'app/views/archive.html'
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
          url : '/blogs/:blogName/posts/:postTitle',
          templateUrl : 'app/views/post.html',
          controller : 'PostCtrl as postCtrl'
        })
      ;
    }
  ])

  .factory('blogs', ['$http', function($http){
    var o = {
      blogs: []
    };

    o.getAll = function() {
      return $http.get('/api/blogs').success(function(data){
        angular.copy(data, o.blogs);
      });
    };

    o.create = function(blog) {
      return $http.post('/api/blogs', blog).success(function(data){
        o.blogs.push(data);
      });
    };

    o.getObjectIdFromName = function(name) {
      for (var i=0; i< o.blogs.length; ++i) {
        if (o.blogs[i].name === name) {
          console.log(o.blogs[i].name + ' ' + name); //debug
          return o.blogs[i]._id;
        }
      }
      throw new Error("Unable to locate requested blog by name");
    };

    return o;
  }])

  .factory('posts', ['$http', 'blogs', function($http, blogs) {
    var o = {
      posts: []
    };

    o.getAllPostsFromBlog = function(blogName) {
      var blogId = blogs.getObjectIdFromName(blogName);
      console.log('/api/blogs/'+blogId+'/posts'); //debug
      return $http.get('/api/blogs/'+blogId+'/posts').success(function(data){
        angular.copy(data, o.posts);
      });
    };

    return o;
  }])
;

