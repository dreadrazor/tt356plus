// Protractor configuration
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./frontend/**/*.js'],
  getPageTimeout: 5000,
  onPrepare: function() {
    browser.driver.manage().window().maximize();
  }
}
