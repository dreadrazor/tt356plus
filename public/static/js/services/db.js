app.service('db', ['Restangular', function(Restangular) {
  this.team = Restangular.all('/api/team');
  this.player = Restangular.all('/api/player');
  this.match = Restangular.all('/api/match');
  this.score = Restangular.all('/api/score');
}]);
