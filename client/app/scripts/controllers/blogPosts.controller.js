'use strict';

angular.module('clientApp')
  .controller('BlogPostsCtrl', ['$stateParams', '$scope', 'posts', function ($stateParams, $scope, posts) {

    this.blogName = $stateParams.blogName;
    $scope.posts = posts.posts;

    this.newPost = {};
    this.createPost = function() {
      this.newPost.lastEdited = new Date();
      //$rootScope.blogs[this.blogName].posts.push(this.newPost); //TODO: ensure no conflicting name
      posts.create(this.newPost, this.blogName);
      this.newPost = {}; //resets
    };

  }]);


