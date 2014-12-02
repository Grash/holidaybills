  var trip = angular.module('holidaybills');
  trip.factory('tripService', [ 'databaseService', '$location', function(databaseService, $location) {
      var tripService = {};
      var id = 0;
      
      tripService.tripList = [];
      
      tripService.registerTrip = function(trip, scope){
          databaseService.saveTrip(trip, function(lastId){
                                           scope.$apply(function(){
                                               trip.id = lastId;
                                               trip.bills = [];
                                               tripService.tripList.push(trip);
                                               console.log("FINAL ID: ", trip.id);
                                               scope.tripId = trip.id;
                                               console.log("New ID:", scope.tripId, scope);
                                           }); 
                                         });
      };
      
      tripService.getTrips = function() {
          return tripService.tripList;
      };
      
      tripService.getTripNames = function() {
          var names = [];
          for(var i = 0; i < tripService.tripList.length; i++){
              names.push(tripService.tripList.name);
          }
//          console.log("trip names", names);
          return names;
      }
      
      tripService.tripNameIsUnique = function(tripName){
          for(var i = 0; i < tripService.tripList.length; i++){
              if(tripService.tripList[i].name == tripName){
//                  console.log("SAME");
                  return false;
              }
          }
//          console.log("UNIQUE");
          return true;
      };
      
      tripService.getTripById = function(id){
          return tripService.tripList[id];
      };
      
      
      
      return tripService;
    }]);