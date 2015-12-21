app.controller('teamController', ['$scope', '$routeParams', function ($scope, $routeParams) {

  $scope.init = function(){
    $scope.team = _.find($scope.$parent.teams, function(team){ return team._id == $routeParams.id });
  }

}]);
