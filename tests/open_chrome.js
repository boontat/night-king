var log = require('bunyan').createLogger({name: 'regression'});
var exec = require('child_process').exec;

module.exports = new (function() {
  var a = process.env.__NIGHTWATCH_ENV_KEY == 'chrome-a_1';
  var b = process.env.__NIGHTWATCH_ENV_KEY == 'chrome-b_2';
  var c = process.env.__NIGHTWATCH_ENV_KEY == 'chrome-c_3';
  var d = process.env.__NIGHTWATCH_ENV_KEY == 'chrome-d_4';
  var testCases = this;

  if (a) {
    log.info('Controlling from chrome-a');
    testCases['Demo test'] = function (browser) {
      browser
        .url('https://www.google.com/')
        .url(function(result) {
          this.assert.equal(result.value, 'https://www.google.com/', 'Url is the same a1');
        })
        .pause(2000)
        .setValue('#lst-ib', 'this is from chrome a')
        .pause(1000)
        .keys('\uE007')
        .pause(9000) // wait longer to perform some other action
        .url('https://www.google.com/')
        .url(function(result) {
          this.assert.equal(result.value, 'https://www.google.com/', 'Url is the same a2');

        })
        .setValue('#lst-ib', 'this is from chrome a again');

      // i need to run something
      // exec('firefox https://en.wikipedia.org/wiki/Main_Page', (err, stdout)=>{
      exec('ls', (err, stdout)=>{
        if (err) {
          throw err;
        }

        console.log('Launch finished');

        console.log(stdout);
      });

      browser
        .pause(10000000)
        .end();
    }
  } else if (b) {
    log.info('Controlling from chrome-b');
    testCases['Demo test'] = function (browser) {
      browser
        .url('https://www.apple.com/')
        .url(function(result) {
          this.assert.equal(result.value, 'https://www.apple.com/', 'Url is the same b1');
        })
        .click('#ac-globalnav > div > ul.ac-gn-list > li.ac-gn-item.ac-gn-item-menu.ac-gn-search > a')// click search button
        .pause(5000)
        .click('#ac-gn-searchform-input')
        .setValue('#ac-gn-searchform-input', 'this is from chrome b')
        .pause(9000) // wait longer to perform some other action
        .url('https://www.apple.com/')
        .url(function(result) {
          this.assert.equal(result.value, 'https://www.apple.com/', 'Url is the same b2');
        })
        .click('#ac-globalnav > div > ul.ac-gn-list > li.ac-gn-item.ac-gn-item-menu.ac-gn-search > a')// click search button
        .pause(5000)
        .click('#ac-gn-searchform-input')
        .setValue('#ac-gn-searchform-input', 'this is from chrome b - hello world')
        .pause(10000000)
        .end();
    }
  } else if (c) {
    log.info('Controlling from chrome-c');
    testCases['Demo test'] = function (browser) {
      browser
        .url('https://www.google.com/')
        .url(function(result) {
          this.assert.equal(result.value, 'https://www.google.com/', 'Url is the same c1');
        })
        .pause(2000)
        .setValue('#lst-ib', 'this is from chrome c')
        .pause(1000)
        .keys('\uE007')
        .pause(9000) // wait longer to perform some other action
        .url('https://www.google.com/')
        .url(function(result) {
          this.assert.equal(result.value, 'https://www.google.com/', 'Url is the same c2');
        })
        .pause(2000)
        .setValue('#lst-ib', 'this is from chrome c - at the third times')
        .pause(10000000)
        .end();
    }
  } else if (d) {
    log.info('Controlling from chrome-d');
    testCases['Demo test'] = function (browser) {
      browser
        .url('https://www.apple.com/')
        .url(function(result) {
          this.assert.equal(result.value, 'https://www.apple.com/', 'Url is the same d1');
        })
        .click('#ac-globalnav > div > ul.ac-gn-list > li.ac-gn-item.ac-gn-item-menu.ac-gn-search > a')// click search button
        .pause(5000)
        .click('#ac-gn-searchform-input')
        .setValue('#ac-gn-searchform-input', 'this is from chrome d')
        .pause(9000) // wait longer to perform some other action
        .url('https://www.apple.com/')
        .url(function(result) {
          this.assert.equal(result.value, 'https://www.apple.com/', 'Url is the same d2');
        })
        .click('#ac-globalnav > div > ul.ac-gn-list > li.ac-gn-item.ac-gn-item-menu.ac-gn-search > a')// click search button
        .pause(5000)
        .click('#ac-gn-searchform-input')
        .setValue('#ac-gn-searchform-input', 'this is from chrome d and this is the last one')
        .pause(10000000)
        .end();
    }
  }

})();
