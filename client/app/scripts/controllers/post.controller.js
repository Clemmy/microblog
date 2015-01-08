'use strict';

angular.module('clientApp')
  .controller('PostCtrl', ['$stateParams', function ($stateParams) {

    this.postTitle = $stateParams.postTitle;

  }]);

