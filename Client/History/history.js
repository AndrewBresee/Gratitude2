angular.module('gratitude.history', [])

.controller('HistoryController', function ($scope, Post, Auth, $location, $window) {
  $scope.data = {};

  // This will set userName to be what the username is set to on log in. 
  
  // $scope.userName = $window.localStorage.getItem('userName');

  // This will check to see if a user is logged in. 
  // if (!Auth.isAuth()) {
  //   $location.path('/signin');
  // }


  $scope.getAllPosts = function () {
    Post.getAll($scope.userName)
      .then(function (data) {
        $scope.data.post = data;
        console.log(data)
      });
  };

  $scope.getAllPosts(); 


});
