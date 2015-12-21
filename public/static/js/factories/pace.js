app.factory('pace', ['$window', function($window){
  return {
    onceAfterLoad: function(todo){
        var done = false;
        $window.Pace.on('done', function(){
          if(!done){
            todo();
            done = true;
          }
        });
    }
  }
}]);
