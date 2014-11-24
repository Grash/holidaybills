  var trip = angular.module('holidaybills');
  trip.factory('databaseService', function() {
      var databaseService = {};
      
      var db = window.openDatabase("holiday_bills_db", "1.0", "HolidayBills Database", 100000);

      function populateDB(tx) {
          tx.executeSql('DROP TABLE IF EXISTS TEST');
          tx.executeSql('CREATE TABLE IF NOT EXISTS TEST (id unique, data)');
          tx.executeSql('INSERT INTO TEST (id, data) VALUES (1, "First row")');
          tx.executeSql('INSERT INTO TEST (id, data) VALUES (2, "Second row")');
     }

     function errorCB(err) {
         alert("Error processing SQL: "+err.code);
     }

     function successCB() {
         alert("success!");
     }
     
     databaseService.testDataSave = function(){
         db.transaction(populateDB, errorCB, successCB);
     };

     
      return databaseService;
    });