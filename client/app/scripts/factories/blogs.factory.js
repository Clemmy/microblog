'use strict';

angular.module('clientApp')
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
        // do nothing
      })
    }

    o.getAll = function(callback) {
      return $http.get('/api/blogs').success(function(data){
        angular.copy(data, o.blogs);
        if (callback && typeof(callback) === "function") {
          callback();
        }
      });
    };

    o.getAllWithPopulatedPosts = function(callback) {
      return $http.get('/api/blogs/all').success(function(data){
        if (callback && typeof(callback) === "function")
          callback(data);
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
