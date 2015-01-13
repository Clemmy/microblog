'use strict';

angular.module('clientApp')
  .controller('ArchiveCtrl', ['$stateParams', '$scope', 'posts', 'blogs', function ($stateParams, $scope, posts, blogs) {

    $scope.blogs = blogs.blogs;

  }])
;


