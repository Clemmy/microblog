'use strict';

angular.module('clientApp')
  .controller('PostCtrl', ['$stateParams', '$scope', 'requestedPost', 'blogAuthor', function ($stateParams, $scope, requestedPost, blogAuthor) {

    $scope.postTitle = requestedPost.data.title;
    $scope.postContent = requestedPost.data.content;
    $scope.postLastEdited = requestedPost.data.lastEdited;
    $scope.postAuthor = blogAuthor.data.author;
  }]);

