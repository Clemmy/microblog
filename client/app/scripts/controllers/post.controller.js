'use strict';

angular.module('clientApp')
  //.controller('PostCtrl', ['$stateParams', '$scope', 'requestedPost', 'blogAuthor', function ($stateParams, $scope, requestedPost, blogAuthor) {
  .controller('PostCtrl', ['$stateParams', '$scope', 'requestedPost', 'posts', function ($stateParams, $scope, requestedPost, posts) {

    $scope.requestedPost = posts.postContext;

    //$scope.postAuthor = blogAuthor.data.author;

  }]);

