app.service('socket', ['$websocket', '$window', function($websocket, $window) {

  this.stream = $websocket('ws://'+$window.location.host+'/live');
  this.messages = [];
  this.stream.onMessage(function(message) {
    this.messages.push(JSON.parse(message));
  });

  this.start = function() {
    this.stream.send(JSON.stringify({ action: 'start' }));
  }

  this.stop = function() {
    this.stream.send(JSON.stringify({ action: 'stop' }));
  }
}]);
