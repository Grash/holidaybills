var Homepage = require('./homepage.po.js');
describe('E2E: main page', function() {
  var ptor;
  var homepage = new Homepage();
  
  
  beforeEach(function() {
    ptor = protractor.getInstance();
    homepage.get(ptor);
  });
  it('should have a title', function() {
      expect(browser.getTitle()).toEqual('Holiday Bill');
    });
  
 it('should load the home page', function() {
      expect(homepage.isMenuLoaded()).toBe(true);
    });
 
 it('should open the new trip form', function() {
     homepage.newTripButton.click();
     expect(ptor.getCurrentUrl()).toMatch(/\/new/);
     
 });
});