'use strict';

angular.module('clientApp')
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
