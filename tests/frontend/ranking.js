var config = require('../../config.json');
var EC = protractor.ExpectedConditions;

describe('Ranking View', function() {

  var title = element(by.tagName('h1')); //need this because of way loading is implemented

  beforeEach(function(){
    browser.get('http://localhost:'+config.DEFAULT_PORT+'/');
  });

  it('should have correct title', function() {
    browser.wait(EC.presenceOf(title), 10000).then(function(){
      expect(title.getText()).toEqual('Ranking');
    });
  });

  it('should start/stop socket', function() {
    browser.wait(EC.presenceOf(title), 10000).then(function(){
      var websocketBtn = element(by.css('.socketInterface .btn'));
      websocketBtn.click();
      expect(websocketBtn.getText()).toEqual('Stop');
      websocketBtn.click();
      expect(websocketBtn.getText()).toEqual('Start');
    });
  });

  it('should have players', function() {
    browser.wait(EC.presenceOf(title), 10000).then(function(){
      element.all(by.css("playerlist .data player")).then(function(arr) {
          expect(arr.length).toBeGreaterThan(0);
      });
    });
  });

  it('should have teams', function() {
    browser.wait(EC.presenceOf(title), 10000).then(function(){
      element.all(by.css("teamlist .data team")).then(function(arr) {
          expect(arr.length).toBeGreaterThan(0);
      });
    });
  });

  it('should filter teams by division', function() {
    browser.wait(EC.presenceOf(title), 10000).then(function(){
      var divFilterBtn = element(by.css('.teams .filter .btn:last-child'));
      element.all(by.css("teamlist .data team")).then(function(arr) {
          var before = arr.length;
          divFilterBtn.click();
          element.all(by.css("teamlist .data team")).then(function(arr) {
              expect(arr.length).toBeLessThan(before);
          });
      });
    });
  });

  it('should process results', function() {
    browser.wait(EC.presenceOf(title), 10000).then(function(){
      var websocketBtn = element(by.css('.socketInterface .btn'));
      websocketBtn.click();
      browser.sleep(2000).then(function(){
        //it should have some data now
        element.all(by.binding("team.points")).then(function(arr) {
            expect(arr[0].getText()).toBeGreaterThan(0);
        });
      });
    });
  });

});
