app.directive('playerlist', function() {
  return {
    restrict: 'E',
    templateUrl: '/static/partials/components/playerList.html',
    scope:{
      players: '=players'
    },
    link: function($scope){

    }
  };
});
