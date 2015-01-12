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
    this.createPostTest = function createPostTest() {
      console.log('here');
      console.log(this.newPost);
      console.log(this.picture);
      $upload.upload({
        url: '/api/images',
        method: 'POST',
        data: this.newPost,
        file: this.picture,
        fileFormDataName: 'picture'
      }).progress(function(event) {
        console.log('progress event');
        console.log(Math.floor(event.loaded / event.total));
      }).success(function(data, status, headers, config) {
        console.log('Photo uploaded!');
      }).error(function(err) {
        console.error('Error uploading file: ' + err.message || err);
      });

    }


  }]);


