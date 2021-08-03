// inspired by https://stackoverflow.com/a/52148600

// import settings from default config file
var properties = null;
var originalConfigFn = require('./karma.conf.js');
originalConfigFn({ set: function(arg) { properties = arg; } });

// alter settings here:
properties.browsers = ['ChromeHeadless'];
properties.singleRun = true
properties.customLaunchers = {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--remote-debugging-port=9222'
        ]}};

// export settings
module.exports = function (config) {
  config.set(properties);
};
