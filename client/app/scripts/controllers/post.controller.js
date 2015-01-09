'use strict';

angular.module('clientApp')
  .controller('PostCtrl', ['$stateParams', '$scope', 'blogs', function ($stateParams, $scope, blogs) {

    //var getArrayOfMatchingPosts = function(titleToMatch) {
    //
    //  var matches = $rootScope.blogs[$stateParams.blogName].posts.filter( function (postInBlog) {
    //    return postInBlog.title === titleToMatch;
    //  });
    //  return matches;
    //};
    //
    //this.postTitle = $stateParams.postTitle;
    //
    //if (getArrayOfMatchingPosts(this.postTitle).length !== 1) {
    //  throw new Error('Unexpected array length.');
    //}
    //
    //this.post =  getArrayOfMatchingPosts(this.postTitle)[0];
    //this.author = $rootScope.blogs[$stateParams.blogName].author;



  }]);

