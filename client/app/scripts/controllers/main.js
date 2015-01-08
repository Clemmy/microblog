'use strict';

angular.module('clientApp')
  .controller('MainCtrl',['$rootScope', function ($rootScope) {

    var post = function() {
      return {
        title : Math.random().toString(36).substring(7),
        lastEdited : new Date(),
        content : 'blah blah blah I am a test post.'
      };
    };

    var blog1 = {
      name : 'blog1',
      description: '',
      author : 'John Doe',
      posts : [ post(), post(), post() ]
    };

    var blog2 = {
      name : 'blog2',
      description: '',
      author : 'Jane Doe',
      posts : [ post(), post(), post() ]
    };

    var blog3 = {
      name : 'blog3',
      description: '',
      author : 'Jimmy Dong',
      posts : [ post(), post(), post() ]
    };

    $rootScope.blogs = { blog1 : blog1, blog2 : blog2, blog3 : blog3 };

    this.newBlog = {}; //initializes //TODO: createBlogController pls & validate (remember ng-dirty etc)
    this.createBlog = function() {
      $rootScope.blogs[this.newBlog.name] = this.newBlog; //TODO: ensure no conflicting name
      this.newBlog = {}; //resets
    };

  }]);
