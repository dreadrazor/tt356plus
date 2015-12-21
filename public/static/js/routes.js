app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/ranking/:div?', {
      templateUrl: '/static/partials/views/ranking.html',
      controller: 'rankingController'
    }).
    when('/player/:id', {
      templateUrl: '/static/partials/views/player.html',
      controller: 'playerController'
    }).
    when('/team/:id', {
      templateUrl: '/static/partials/views/team.html',
      controller: 'teamController'
    }).
    otherwise({
      redirectTo: '/ranking'
    });
}]);
