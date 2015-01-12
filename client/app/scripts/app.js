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
            requestedPost : ['posts', '$stateParams', function(posts, $stateParams) {
              return posts.getPostFromIdAndBlogName($stateParams.postId, $stateParams.blogName);
            }],
            blogAuthor : ['blogs', '$stateParams', function(blogs, $stateParams) {
              return blogs.getBlogFromName($stateParams.blogName);
            }]
          }
        })
      ;
    }
  ])

  .factory('blogs', ['$http', function($http){
    var o = {
      blogs : []
    };

    o.getObjectIdFromName = function(name) {
      for (var i=0; i< o.blogs.length; ++i) {
        if (o.blogs[i].name === name) {
          return o.blogs[i]._id;
        }
      }
      throw new Error("Unable to locate requested blog by name");
    };

    o.getBlogFromName = function(name) {
      var blogId = o.getObjectIdFromName(name);
      return $http.get('/api/blogs/'+blogId).success(function(data) {
      })
    }

    o.getAll = function() {
      return $http.get('/api/blogs').success(function(data){
        angular.copy(data, o.blogs);
      });
    };

    o.getAllWithPopulatedPosts = function() {
      return $http.get('/api/blogs/all').success(function(data){
        // do nothing
      });
    }

    o.create = function(blog) {
      return $http.post('/api/blogs', blog).success(function(data){
        o.blogs.push(data);
      });
    };

    o.remove = function(name) {
      var blogId = o.getObjectIdFromName(name);
      $http.delete('/api/blogs/'+blogId).success(function(data){
        o.blogs.pop(data);
      });
    };

    return o;
  }])

  .factory('posts', ['$http', 'blogs', function($http, blogs) {
    var o = {
      posts: []
    };

    o.getAllPostsFromBlog = function(blogName) {
      var blogId = blogs.getObjectIdFromName(blogName);
      return $http.get('/api/blogs/'+blogId+'/posts').success(function(data){
        angular.copy(data, o.posts);
      });
    };

    o.create = function(post, blogName) {
      var blogId = blogs.getObjectIdFromName(blogName);
      return $http.post('/api/blogs/'+blogId+'/posts', post).success(function(data){
        o.posts.push(data);
      });
    };

    o.getPostFromIdAndBlogName = function(postId, blogName) {
      var blogId = blogs.getObjectIdFromName(blogName);
      return $http.get('/api/blogs/'+blogId+'/posts/'+postId).success(function(data){
        // do nothing in success callback
      });
    }

    o.removePostFromIdAndBlogName = function(postId, blogName) {
      var blogId = blogs.getObjectIdFromName(blogName);
      $http.delete('/api/blogs/'+blogId+'/posts/'+postId).success(function(data){
        o.posts.pop(data);
      });
    };

    return o;
  }])
;

