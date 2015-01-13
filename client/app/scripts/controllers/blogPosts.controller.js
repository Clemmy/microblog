'use strict';

angular.module('clientApp')
  .controller('BlogPostsCtrl', ['$stateParams', '$scope', 'posts', 'blogs', function ($stateParams, $scope, posts, blogs) {

    this.blogName = $stateParams.blogName;
    this.blogId = blogs.getObjectIdFromName(this.blogName);
    $scope.posts = posts.posts;
    $scope.newPost = {};

    this.removePost = function(postId, index) {
      posts.removePostFromIdAndBlogName(postId, this.blogName).success(function (data) {
        $scope.posts.splice(index, 1);
      });
    }

    $scope.uploadComplete = function(content) {
      // manually force update and form refresh
      posts.posts.push(content);
      $scope.posts = posts.posts;
      $scope.newPost = {};
    }

  }])
;


