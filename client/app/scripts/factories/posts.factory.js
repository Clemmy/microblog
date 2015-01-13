'use strict';

angular.module('clientApp')
  .factory('posts', ['$http', 'blogs', '$q', function($http, blogs, $q) {
    var o = {
      posts : [],
      postContext : {}
    };

    o.getAllPostsFromBlog = function(blogName) {
      //first fetches blogs from backend so blogs service functions work
      var postsPromise = $q.defer();
      (function() {
        blogs.getAll(function () { // callback
          var blogId = blogs.getObjectIdFromName(blogName);
          return $http.get('/api/blogs/' + blogId + '/posts').success(function (data) {
            angular.copy(data, o.posts);
            postsPromise.resolve();
          });
        });
      })();
      return postsPromise.promise;
    };

    o.create = function(post, blogName) {
      var blogId = blogs.getObjectIdFromName(blogName);
      return $http.post('/api/blogs/'+blogId+'/posts', post).success(function(data){
        o.posts.push(data);
      });
    };

    o.getPostFromIdAndBlogName = function(postId, blogName, callback) {
      //first fetches blogs from backend so blogs service functions work
      var postPromise = $q.defer();
      (function() {
        (function () {
          var d = $q.defer();
          blogs.getAll(function () {
            d.resolve();
          });
          return d.promise;
        })().then(function () {
          var blogId = blogs.getObjectIdFromName(blogName);
          return $http.get('/api/blogs/' + blogId + '/posts/' + postId).success(function (requestedPost) {
            o.postContext = requestedPost;
            // get author
            $http.get('/api/blogs/'+blogId).success(function(data) {
              o.postContext.author = data.author;
              postPromise.resolve();
            });
          });
        });
      })();
      return postPromise.promise;
    };

    o.removePostFromIdAndBlogName = function(postId, blogName) {
      var blogId = blogs.getObjectIdFromName(blogName);
      //$http.delete('/api/blogs/'+blogId+'/posts/'+postId).success(function(data){
      //});
      return $http.delete('/api/blogs/'+blogId+'/posts/'+postId);
    };

    return o;
  }])
;
