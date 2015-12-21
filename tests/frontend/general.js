var config = require('../../config.json');

describe('General Tests', function() {

  beforeEach(function(){
    browser.get('http://localhost:'+config.DEFAULT_PORT+'/');
  });

  it('should have correct title', function() {
    browser.get('http://localhost:'+config.DEFAULT_PORT+'/');
    expect(browser.getTitle()).toEqual('tt365plus');
  });

});
