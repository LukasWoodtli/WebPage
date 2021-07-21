// https://github.com/cypress-io/cypress/issues/14558

module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {
    launchOptions.args.push('--disable-gpu');
    launchOptions.args.push('--disable-software-rasterizer');
    return launchOptions;
  });
