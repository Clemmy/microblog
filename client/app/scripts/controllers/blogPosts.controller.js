'use strict';

angular.module('clientApp')
  .controller('BlogPostsCtrl', ['$stateParams', '$scope', 'posts', '$upload', function ($stateParams, $scope, posts, $upload) {

    this.blogName = $stateParams.blogName;
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

    $scope.onFileSelect = function($files) {

      console.log('here'); //debug
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        console.log(file);
        $scope.upload = $upload.upload({
          url: '/api/images',
          data: {
            myObj: $scope.myModelObj
          },
          file: file,
        }).progress(function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          console.log(data);
        });
      }
    };


  }]);


