'use strict';

angular.module('clientApp')
  .controller('MainCtrl',['$scope', 'blogs', function ($scope, blogs) {

    $scope.blogs = blogs.blogs;
    this.duplicateName = false;
    this.emptyName = false;
    this.newBlog = {};

    this.createBlog = function() {

      if (blogs.blogs.map(function(el) { return el.name; }).indexOf(this.newBlog.name) < 0) { // blog title is unique
        if (this.newBlog.name) {
          blogs.create(this.newBlog);
          this.newBlog = {}; //resets
          this.duplicateName = false;
          this.emptyName - false;
        }
        else {
          this.emptyName = true;
        }
      }
      else {
        this.duplicateName = true;
        this.newBlog.name = '';
      }

    };

    this.deleteBlog = function(blog) {
      blogs.remove(blog);
    }

  }]);
