app.service('socket', ['$websocket', '$window', function($websocket, $window) {
  this.stream = $websocket('ws://'+$window.location.host+'/results');
  this.onMessage = function(cb){
    this.stream.onMessage(cb);
  }

  this.start = function() {
    this.stream.send(JSON.stringify({ action: 'start' }));
  }

  this.stop = function() {
    this.stream.send(JSON.stringify({ action: 'stop' }));
  }

}]);
