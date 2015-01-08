'use strict';

angular.module('clientApp')
  .controller('BlogPostsCtrl', ['$stateParams', '$rootScope', function ($stateParams, $rootScope) {

    this.blogName = $stateParams.blogName;

    //form stuff //TODO refactor the area under this
    this.newPost = {};
    this.createPost = function() {
      this.newPost.lastEdited = new Date();
      $rootScope.blogs[this.blogName].posts.push(this.newPost); //TODO: ensure no conflicting name
      this.newPost = {}; //resets
    };

  }]);


