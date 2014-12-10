var NewTrip = function() {
  var MAIN_MENU_URL = "http://127.0.0.1:8080/bill/#";
  var NEW_TRIP_FORM_URL = 'http://127.0.0.1:8080/bill/#/new';
  var ptor = null;
  
  this.header = element(by.id('newTripHeader'));
  this.tripNameContainer = element(by.id('tripNameContainer'));
  this.tripNameInput = element(by.id('tripNameInput'));
  this.addparticipantButton = element(by.id('addParticipantButton'));
  this.createTripButton = element(by.id('newTripSaveButton'));
  this.tripNameEmptyError = element(by.id('tripNameEmptyError'));
  this.tripNameNotUniqueError = element(by.id('tripNameNotUniqueError'));
  
  this.form = element(by.id('tripForm'));

  this.get = function(p) {
    browser.get(MAIN_MENU_URL);
    element(by.id('mockDataButton')).click();
    element(by.id('newTripButton')).click();
    ptor = p;
  };
  
  this.correctFormVisible = function(){
      var returnValue = ptor.isElementPresent(this.form);
      return returnValue && this.isTripNameInputPresentedCorrectly();
  };
  
  this.isTripNameInputPresentedCorrectly = function(){
      var returnValue = ptor.isElementPresent(this.tripNameContainer) && ptor.isElementPresent(this.tripNameInput);
      return returnValue;
  };
  
  this.getParticipantListItems = function(){
      return element.all(by.css('.participant'));
  };
  
  this.getparticipantNameInputFields = function(){
      return element.all(by.css('.participantName'));
  };
  
  this.getParticipantNameRequiredErrors = function(){
      var errors = element.all(by.css('.participantNameRequired'));
      return errors;
  };
  
  this.getParticipantNameNotUniqueErrors = function(){
      var errors = element.all(by.css('.participantNameNotUnique'));
      return errors;
  };
  
  this.isErrorPresented = function(error){
      return ptor.isElementPresent(error);
  };
  
  this.fillFormWithValidData = function(){
      
  };
    
};

module.exports = NewTrip;