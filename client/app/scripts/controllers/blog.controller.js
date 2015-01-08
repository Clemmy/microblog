'use strict';

angular.module('clientApp')
  .controller('BlogCtrl', ['$stateParams', function ($stateParams) {

    this.testVar = $stateParams.blogName;

  }]);
