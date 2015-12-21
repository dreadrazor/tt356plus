app.directive('teamlist', function() {
  return {
    restrict: 'E',
    templateUrl: '/static/partials/components/teamList.html',
    scope:{
      teams: '=teams'
    },
    link: function($scope){
      //$scope.divisions = _.uniq(_.pluck($scope.teams, 'division'));
      $scope.divisions = [1, 2, 3];
      if($scope.$parent.division){
        $scope.filter = {division: parseInt($scope.$parent.division)};
      }else{
        $scope.filter = {division: ''};
      }

      $scope.filterDiv = function(d){
        $scope.filter = { division: d };
      }
    }
  };
});
