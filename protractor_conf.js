// An example configuration file.
exports.config = {

	// Do not start a Selenium Standalone sever - only run this using chrome.
  chromeOnly: true,
  chromeDriver: 'd:/projects/holidaybills/holidaybills/node_modules/protractor/selenium/chromedriver',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  //specs: ['test/e2e/main/**/*_spec.js'],
  //specs: ['test/e2e/main/homepage/homepage_spec.js'],
  specs: ['test/e2e/main/newtrip/newtrip_spec.js'],
  
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true,
    includeStackTrace: true
  }
};
