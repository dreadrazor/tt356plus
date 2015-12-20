app.controller('mainController', ['$scope', 'socket', function ($scope, socket) {
  socket.start();
}]);
