var log = require('bunyan').createLogger({name: 'regression'});

module.exports = new (function() {
  var firstClient = process.env.__NIGHTWATCH_ENV_KEY == 'chrome-a_1';
  var testCases = this;

  if (firstClient) {
    log.info('Controlling from chrome-a');
    testCases['Demo test'] = function (browser) {
      browser
        .url('https://www.google.com/')
        .url(function(result) {
          this.assert.equal(result.value, 'https://www.google.com/', 'Url is the same');
        })
        .pause(2000)
        .setValue('#lst-ib', 'this is from chrome a')
        .pause(1000)
        .keys('\uE007')
        .pause(10000000)
        .end();
    }
  } else {
    log.info('Controlling from chrome-b');
    testCases['Demo test'] = function (browser) {
      browser
        .url('https://www.apple.com/')
        .url(function(result) {
          this.assert.equal(result.value, 'https://www.apple.com/', 'Url is the same');
        })
        .click('#ac-globalnav > div > ul.ac-gn-list > li.ac-gn-item.ac-gn-item-menu.ac-gn-search > a')// click search button
        .pause(5000)
        .click('#ac-gn-searchform-input')
        .setValue('#ac-gn-searchform-input', 'this is from chrome b')
        .pause(10000000)
        .end();
    }
  }

})();
