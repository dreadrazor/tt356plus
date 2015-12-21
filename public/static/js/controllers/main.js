app.controller('mainController', ['$scope', 'socket', 'db', 'pace', function ($scope, socket, db, pace) {

  $scope.socketSwitch = { value: false };
  $scope.isReady = { value: false };

  $scope.toggleSocket = function(){
    if($scope.socketSwitch.value){
      socket.stop();
    }else{
      socket.start();
    }

    $scope.socketSwitch.value = !$scope.socketSwitch.value;
  }

  $scope.processMessage = function(message){

    var data = JSON.parse(message.data);

    if(data.length){
      for(var r in data){
        var p1 = _.find($scope.players, function(p){ return data[r].p1 == p._id });
        var p2 = _.find($scope.players, function(p){ return data[r].p2 == p._id });

        if(p1 && p2 && p1 !== p2){
          var score = data[r].score.split("-");
          var winner;

          if(parseInt(score[0]) > parseInt(score[1])){
            p1.rating += Math.round(p2.rating / 100);
            p2.rating -= Math.round(p2.rating / 100);

            p1._team.points++;
            winner = p1;
          }else if(parseInt(score[0]) < parseInt(score[1])){
            p1.rating -= Math.round(p1.rating / 100);
            p2.rating += Math.round(p1.rating / 100);

            p2._team.points++;
            winner = p2;
          }else{
            //can't draw
          }

          //append results
          var result = {
            p1: p1,
            p2: p2,
            score: data[r].score,
            winner: winner
          };

          if(!p1._results){
            p1._results = [];
          }
          p1._results.push(result);
          //determine trend
          p1._trend = _.reduce(p1._results.slice(-4, -1), function(memo, res){ return (res.winner === p1 ? memo+1 : memo) }, 0);

          if(!p2._results){
            p2._results = [];
          }
          p2._results.push(result);
          p2._trend = _.reduce(p2._results.slice(-4, -1), function(memo, res){ return (res.winner === p2 ? memo+1 : memo) }, 0);
        }
      }
    }
  }

  socket.onMessage($scope.processMessage);

  function getTeams(callback){
    db.team.getList().then(function(teams){
      $scope.teams = teams.plain();
      for(var t in $scope.teams){
        $scope.teams[t].points = 0;
      }
      callback(null);
    });
  }

  function getPlayers(callback){
    db.player.getList().then(function(players){
      $scope.players = players.plain();
      for(var p in $scope.players){
        if($scope.players[p] && typeof $scope.players[p] == "object"){
          var pt = _.find($scope.teams, function(team){ return team._id == $scope.players[p].team });
          if(pt){
            $scope.players[p]._team = pt;
            if(!pt._players){
              pt._players = [];
            }
            if(pt._players.indexOf($scope.players[p]) == -1){
              pt._players.push($scope.players[p]);
            }
          }
        }
      }

      callback(null);
    });
  }

  pace.onceAfterLoad(function(){
    async.series([getTeams, getPlayers], function(err, data){
      $scope.isReady.value = true;
    });
  });

}]);
