'use strict';

angular.module('clientApp')
  .controller('PostCtrl', ['$stateParams', '$scope', 'requestedPost', function ($stateParams, $scope, requestedPost) {

    $scope.postTitle = requestedPost.data.title;
    $scope.postContent = requestedPost.data.content;
    $scope.postLastEdited = requestedPost.data.lastEdited;
  }]);

