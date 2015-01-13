'use strict';

angular.module('clientApp')
  .controller('PostCtrl', ['$stateParams', '$scope', 'requestedPost', 'posts', function ($stateParams, $scope, requestedPost, posts) {

    $scope.requestedPost = posts.postContext;

  }]);

