var NewTrip = require('./newtrip.po.js');
describe('E2E: new trip page', function() {
  var ptor;
  var newTrip = new NewTrip();
  
  beforeEach(function() {
    //browser.debugger();
    ptor = protractor.getInstance();
    newTrip.get(ptor);
  });
  it('should have a form title', function() {
      expect(newTrip.header.getText()).toEqual('New Trip');
    });
  
  it('should present new trip form correctly', function(){
      expect(newTrip.correctFormVisible()).toBe(true);
      expect(newTrip.getParticipantListItems().count()).toBe(2);
  });
  
  it('should add new participant if have enough name', function(){
      var participantInputFields = newTrip.getparticipantNameInputFields();
      expect(participantInputFields.count()).toBe(2);
      participantInputFields.get(0).sendKeys("First");
      participantInputFields.get(1).sendKeys("Second");
      newTrip.addparticipantButton.click();
      
      element.all(by.css('.participantNameRequired')).each(function(element){
          expect(element.isDisplayed()).not.toBeTruthy();
      });
      
      expect(participantInputFields.count()).toBe(3);
  });
  
  it('should not add new participant if names are missing', function(){
      var participantInputFields = newTrip.getparticipantNameInputFields();
      expect(participantInputFields.count()).toBe(2);
      newTrip.addparticipantButton.click();
      element.all(by.css('.participantNameRequired')).each(function(element){
          expect(element.isDisplayed()).toBeTruthy();
      });
      expect(participantInputFields.count()).toBe(2);
  });
  
  it('should create new trip if every field is valid', function(){
      var participantInputFields = newTrip.getparticipantNameInputFields();
      expect(participantInputFields.count()).toBe(2);
      participantInputFields.get(0).sendKeys("First");
      participantInputFields.get(1).sendKeys("Second");
      newTrip.tripNameInput.sendKeys("Italy");
      newTrip.createTripButton.click();
      expect(ptor.getCurrentUrl()).toMatch(/\/trip/);
  });
  
  it('should present error if trip name missing', function(){
      var participantInputFields = newTrip.getparticipantNameInputFields();
      expect(participantInputFields.count()).toBe(2);
      participantInputFields.get(0).sendKeys("First");
      participantInputFields.get(1).sendKeys("Second");
      newTrip.createTripButton.click();
      expect(newTrip.tripNameEmptyError.isDisplayed()).toBeTruthy();
  });
  
  it('should present error if participant name not unique', function(){
      var participantInputFields = newTrip.getparticipantNameInputFields();
      expect(participantInputFields.count()).toBe(2);
      participantInputFields.get(0).sendKeys("First");
      participantInputFields.get(1).sendKeys("First");
      newTrip.tripNameInput.sendKeys("Italy");
      newTrip.createTripButton.click();
      var errors = newTrip.getParticipantNameNotUniqueErrors();
      expect(errors.get(0).isDisplayed()).toBeTruthy();
      expect(errors.get(1).isDisplayed()).toBeTruthy();
  });
  
  it('should create new trip if have two participants at least', function(){
      newTrip.tripNameInput.sendKeys("Italy");
      var participantInputFields = newTrip.getparticipantNameInputFields();
      expect(participantInputFields.count()).toBe(2);
      participantInputFields.get(0).sendKeys("First");
      participantInputFields.get(1).sendKeys("Second");
      newTrip.addparticipantButton.click();
      participantInputFields = newTrip.getparticipantNameInputFields();
      participantInputFields.get(1).clear();
      participantInputFields.get(2).sendKeys("Third");
      newTrip.createTripButton.click();
      expect(ptor.getCurrentUrl()).toMatch(/\/trip/);
  });
  
  it('should present error if trip name not unique', function(){
      newTrip.tripNameInput.sendKeys("Greece");
      var participantInputFields = newTrip.getparticipantNameInputFields();
      expect(participantInputFields.count()).toBe(2);
      participantInputFields.get(0).sendKeys("First");
      participantInputFields.get(1).sendKeys("Second");
      newTrip.createTripButton.click();
      expect(newTrip.tripNameNotUniqueError.isDisplayed()).toBeTruthy();
  });
  
  
  
});