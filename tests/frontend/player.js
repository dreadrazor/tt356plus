var config = require('../../config.json');
var EC = protractor.ExpectedConditions;

describe('Player View', function() {

  var title = element(by.tagName('h1')); //need this because of way loading is implemented

  beforeEach(function(){
    browser.get('http://localhost:'+config.DEFAULT_PORT+'/');
    browser.wait(EC.presenceOf(title), 10000).then(function(){
      var websocketBtn = element(by.css('.socketInterface .btn'));
      websocketBtn.click();
      browser.sleep(5000).then(function(){
        element(by.css("player:first-child .name a")).click();
      });
    });
  });

  it('should have correct title', function() {
    browser.wait(EC.presenceOf(title), 10000).then(function(){
      expect(title.getText()).toMatch(/Player > .*/);
    });
  });

  it('should have results', function() {
    browser.wait(EC.presenceOf(title), 10000).then(function(){
      element.all(by.css("resultlist .data result")).then(function(arr) {
          expect(arr.length).toBeGreaterThan(0);
      });
    });
  });

});
