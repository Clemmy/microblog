'use strict';

angular.module('clientApp')
  .controller('MainCtrl',['$scope', 'blogs', function ($scope, blogs) {

    $scope.blogs = blogs.blogs;

    this.newBlog = {}; //initializes //TODO: createBlogController pls & validate (remember ng-dirty etc)

    this.createBlog = function() {
      //TODO: ensure no conflicting name
      blogs.create(this.newBlog);
      this.newBlog = {}; //resets
    };

  }]);
