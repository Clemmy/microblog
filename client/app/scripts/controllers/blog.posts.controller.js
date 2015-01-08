'use strict';

angular.module('clientApp')
  .controller('BlogPostsCtrl', ['$stateParams', function ($stateParams) {

    this.blogName = $stateParams.blogName;

  }]);
