app.directive('resultlist', function() {
  return {
    restrict: 'E',
    templateUrl: '/static/partials/components/resultList.html',
    scope:{
      player: '=player'
    },
    link: function($scope){

    }
  };
});
