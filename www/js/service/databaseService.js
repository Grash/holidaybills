  var trip = angular.module('holidaybills');
  trip.factory('databaseService', function() {
      var databaseService = {};
      
      var db = typeof(window.openDatabase)=='undefined' ? undefined : window.openDatabase("holiday_bills_db", "1.0", "HolidayBills Database", 100000);

      function populateDB(tx) {
          //tx.executeSql('DROP TABLE IF EXISTS TEST');
          tx.executeSql('CREATE TABLE IF NOT EXISTS TRIP (id INTEGER PRIMARY KEY ASC, name)');
          tx.executeSql('CREATE TABLE IF NOT EXISTS PERSON (id INTEGER PRIMARY KEY ASC, name, tripId)');
          tx.executeSql('CREATE TABLE IF NOT EXISTS BILL (id INTEGER PRIMARY KEY ASC, tripId, name)');
          tx.executeSql('CREATE TABLE IF NOT EXISTS BILL_PARTICIPANTS (id INTEGER PRIMARY KEY ASC, billId, personId)');
//          tx.executeSql('INSERT INTO TEST (data) VALUES ("First row1")');
//          tx.executeSql('INSERT INTO TEST (data) VALUES ("Second row1")');
      }
      
      function deleteTables(tx) {
          tx.executeSql('DROP TABLE IF EXISTS TRIP');
          tx.executeSql('DROP TABLE IF EXISTS PERSON');
          tx.executeSql('DROP TABLE IF EXISTS BILL');
          tx.executeSql('DROP TABLE IF EXISTS BILL_PARTICIPANTS');
      }
      
      function saveTrip(name, participants, callback) {
          var lastInsertId = 0;
          lastInsertId = db.transaction(function(tx){
                  tx.executeSql('INSERT INTO TRIP (name) VALUES (?)',
                          [name],
                          function(tx, results){
                              lastInsertId = results.insertId;
                              saveParticipants(participants, lastInsertId, callback);
                          });
              }
              , function(e) {
                  return console.log("ERROR: " + e.message);
              }, function() {
                  return lastInsertId;
              });
          return lastInsertId;
      }
      
      function saveParticipants(participants, lastId, callback){
          var transactionSuccess = false;
          db.transaction(function(tx){
              for(var i = 0; i < participants.length; i++){
                  tx.executeSql('INSERT INTO PERSON (tripId, name) VALUES (?,?)',
                          [lastId, participants[i]]);
              }
          }
          , function(e) {
              transactionSuccess = false;
              return console.log("ERROR: " + e.message);
          }
          , function() {
              transactionSuccess = true;
              console.log("SAVE PARTICIPANTS SUCCESSFULL");
              callback(lastId);
              return transactionSuccess;
              
          });
          console.log("return success");
          return transactionSuccess;
      }
      
      function queryDB(tx) {
          tx.executeSql('SELECT * FROM TEST', [], querySuccess, errorCB);
      }
      
      function querySuccess(tx, results) {
          console.log("Returned rows = " + results.rows.length);
          // this will be true since it was a select statement and so rowsAffected was 0
          if (!results.rowsAffected) {
            console.log('No rows affected!');
            //return false;
          }
          for(var i = 0; i < results.rows.length; i++){
              console.log("Result: ", results.rows.item(i));
          }
          return false;
      }

     function errorCB(err) {
         alert("Error processing SQL: "+err.code);
     }

     function successCB() {
         //alert("success!");
     }
     
     databaseService.initDatabase = function(){
         db.transaction(populateDB, errorCB, successCB);
     };
     
     databaseService.resetDb = function(){
         db.transaction(deleteTables, errorCB);
         databaseService.initDatabase();
     };
     
     databaseService.saveTrip = function(trip, returnFunction){
         var lastId = saveTrip(trip.name, trip.participants, returnFunction);
         //var success = saveParticipants(trip.participants, lastId);
//         if(success){
//             return lastId;
//         } else {
//             return 0;
//         }
     };

     
      return databaseService;
    });