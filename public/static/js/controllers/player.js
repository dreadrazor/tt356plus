app.controller('playerController', ['$scope', '$routeParams', function ($scope, $routeParams) {

  $scope.init = function(){
    $scope.player = _.find($scope.$parent.players, function(player){ return player._id == $routeParams.id });
  }

}]);
