var Homepage = function() {
  var MAIN_MENU_URL = "http://127.0.0.1:8080/bill/#";
  var ptor;
  this.newTripButton = element(by.id('newTripButton'));
  this.availableTripButton = element(by.id('availableTripButton'));
  this.settingsButton = element(by.id('settingsButton'));
  this.mockDataButton = element(by.id('mockDataButton'));

  this.get = function(p) {
    browser.get(MAIN_MENU_URL);
    ptor = p;
  };

  this.isNewTripButton = function() {
    return ptor.isElementPresent(this.newTripButton);
  };
  
  this.isAvailableTripButton = function() {
      return ptor.isElementPresent(this.availableTripButton);
  };
  
  this.isSettingsButton = function() {
      return ptor.isElementPresent(this.settingsButton);
  };
  
  this.isMenuLoaded = function() {
      return this.isNewTripButton() && this.isAvailableTripButton() && this.isSettingsButton();
  };
  
//  this.addMockDataAndOpenNewTripForm = function(){
//      
//  };
//    
};

module.exports = Homepage;