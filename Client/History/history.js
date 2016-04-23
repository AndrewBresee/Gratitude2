angular.module('gratitude.history', [])

.controller('HistoryController', function ($scope) {
  $scope.data = {};

  $scope.getAllPosts = function () {
    Post.getAll($scope.userName)
      .then(function (data) {
        $scope.data.post = data;
        console.log(data)
      });
  };

  $scope.getAllPosts(); 


});
