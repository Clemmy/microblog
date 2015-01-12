'use strict';

angular.module('clientApp')
  .controller('BlogPostsCtrl', ['$stateParams', '$scope', 'posts', '$upload', function ($stateParams, $scope, posts, $upload) {

    this.blogName = $stateParams.blogName;
    this.picture = null;
    $scope.posts = posts.posts;

    this.newPost = {};
    this.createPost = function() {
      this.newPost.lastEdited = new Date();
      posts.create(this.newPost, this.blogName);
      this.newPost = {}; //resets
    };

    this.removePost = function(postId) {
      posts.removePostFromIdAndBlogName(postId, this.blogName);
    }

    // this function is under development
    // TODO: pass in blog and post information to structure the filesystem accordingly and avoid naming conflicts/overwrites
    this.createPostTest = function createPostTest() {
      $upload.upload({
        url: '/api/images',
        method: 'POST',
        data: this.newPost,
        file: this.picture,
        fileFormDataName: 'picture'
      }).success(function(data, status, headers, config) {
        console.log('Photo uploaded!');
      }).error(function(err) {
        console.error('Error uploading file: ' + err.message || err);
      });

    }


  }]);


