'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope) {

    var post = {
      content : 'blah blah blah I am a test post.'
    };

    var blog1 = {
      name : 'blog1',
      author : 'John Doe',
      posts : [ post, post, post ]
    };

    var blog2 = {
      name : 'blog2',
      author : 'Jane Doe',
      posts : [ post, post, post ]
    };

    var blog3 = {
      name : 'blog3',
      author : 'Jimmy Dong',
      posts : [ post, post, post ]
    };
    console.log(blog1);
    $scope.blogs = [ blog1, blog2, blog3 ];
    this.count = 3;
  });
