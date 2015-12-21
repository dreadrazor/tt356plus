var config = require('../../config.json');
var EC = protractor.ExpectedConditions;

describe('Team View', function() {

  var title = element(by.tagName('h1')); //need this because of way loading is implemented

  beforeEach(function(){
    browser.get('http://localhost:'+config.DEFAULT_PORT+'/');
    browser.wait(EC.presenceOf(title), 10000).then(function(){
        element(by.css("team:first-child .name a")).click();
    });
  });

  it('should have correct title', function() {
    browser.wait(EC.presenceOf(title), 10000).then(function(){
      expect(title.getText()).toMatch(/Team > .*/);
    });
  });

  it('should have players', function() {
    browser.wait(EC.presenceOf(title), 10000).then(function(){
      element.all(by.css("playerlist .data player")).then(function(arr) {
          expect(arr.length).toBeGreaterThan(0);
      });
    });
  });

});
