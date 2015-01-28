  var trip = angular.module('holidaybills');
  trip.factory('databaseService', function() {
      var databaseService = {};
      
      var db = typeof(window.openDatabase)=='undefined' ? undefined : window.openDatabase("holiday_bills_db", "1.0", "HolidayBills Database", 100000);

      function populateDB(tx) {
          //tx.executeSql('DROP TABLE IF EXISTS TEST');
          tx.executeSql('CREATE TABLE IF NOT EXISTS TRIP (id INTEGER PRIMARY KEY ASC, name)');
          tx.executeSql('CREATE TABLE IF NOT EXISTS PERSON (id INTEGER PRIMARY KEY ASC, name, tripId)');
          tx.executeSql('CREATE TABLE IF NOT EXISTS BILL (id INTEGER PRIMARY KEY ASC, tripId, name)');
          tx.executeSql('CREATE TABLE IF NOT EXISTS BILL_PARTICIPANTS (id INTEGER PRIMARY KEY ASC, billId, personId, type, amount, share)');
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
          var partIds = [];
          db.transaction(function(tx){
              for(var i = 0; i < participants.length; i++){
                  tx.executeSql('INSERT INTO PERSON (tripId, name) VALUES (?,?)',
                          [lastId, participants[i]],
                          function(tx, results){
                              partIds.push(results.insertId);
                              console.log("Part: ", partIds);
                          });
              }
          }
          , function(e) {
              transactionSuccess = false;
              return console.log("ERROR: " + e.message);
          }
          , function() {
              transactionSuccess = true;
              for(var i = 0; i < participants.length; i++){
                  participants[i].id = partIds[i];
              }
              callback(lastId);
              return transactionSuccess;
              
          });
          console.log("return success");
          return transactionSuccess;
      };
      
      function saveBill(tripId, bill, callback) {
          var lastInsertId = 0;
          lastInsertId = db.transaction(function(tx){
                  tx.executeSql('INSERT INTO BILL (tripId, name) VALUES (?,?)',
                          [tripId, bill.name],
                          function(tx, results){
                              lastInsertId = results.insertId;
                              saveBillParticipants(bill, lastInsertId, callback);
                          });
              }
              , function(e) {
                  return console.log("ERROR: " + e.message);
              }, function() {
                  return lastInsertId;
              });
      };
      
      function saveBillParticipants(bill, lastId, callback){
          var transactionSuccess = false;
          db.transaction(function(tx){
              for(var i = 0; i < bill.owners.length; i++){
                  tx.executeSql('INSERT INTO BILL_PARTICIPANTS (billId, personId, type, amount, share) VALUES (?,?,?,?,?)',
                          [lastId, bill.owners[i].id, "owner", bill.owners[i].amount, bill.owners[i].share]);
              }
              for(var j = 0; j < bill.others.length; j++){
                  tx.executeSql('INSERT INTO BILL_PARTICIPANTS (billId, personId, type, amount, share) VALUES (?,?,?,?,?)',
                          [lastId, bill.others[j].id, "other", 0, bill.others[j].share]);
              }
          }
          , function(e) {
              transactionSuccess = false;
              return console.log("ERROR: " + e.message);
          }
          , function() {
              transactionSuccess = true;
              callback();
              return transactionSuccess;
              
          });
          console.log("return success");
          return transactionSuccess;
      };
      
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
         console.log("success!");
     }
     
     databaseService.initDatabase = function(){
         db.transaction(populateDB, errorCB, successCB);
     };
     
     databaseService.resetDb = function(){
         db.transaction(deleteTables, errorCB);
         databaseService.initDatabase();
     };
     
     databaseService.saveTrip = function(trip, returnFunction){
         saveTrip(trip.name, trip.participants, returnFunction);
         //var success = saveParticipants(trip.participants, lastId);
//         if(success){
//             return lastId;
//         } else {
//             return 0;
//         }
     };
     
     databaseService.saveBill = function(tripId, bill, callBack){
         saveBill(tripId, bill, callBack);
     };
     
     databaseService.getTrips = function(id, trips){
         db.transaction(function(tx){
             tx.executeSql('SELECT id, name FROM TRIP',
                     function(tx, results){
//                         var len = results.rows.length;
                         var trip = {};
                         for(var i = 0; i < results.rows.length; i++)
                         {
                             trip.id = results.rows.item(i)['id'];
                             trip.name = results.rows.item(i)['name'];
                             trips.push(trip);
                         }
                         for(var j = 0; j < trips.length; j++){
                             tx.executeSql('SELECT name FROM PERSON WHERE tripId=?',
                                     [trips[j].id],
                                     function(tx, results){
                                         var len = results.rows.length;
                                         var parts = [];
                                         for(var i = 0; i < results.rows.length; i++){
                                             parts.push(results.rows.item(i)['name']);
                                         }
                                     });
                         }
                     });
         }, errorCB, successCB);
     };

     
      return databaseService;
    });