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
                                               console.log("Trip Participants: ", trip.participants);
                                               tripService.tripList.push(trip);
//                                               tripService.tripList[trip.id]=trip;
                                               console.log("FINAL ID: ", trip.id);
                                               scope.tripId = trip.id;
                                           });
                                         });
      };
      
      tripService.saveBill = function(tripId, bill, callBack){
//          console.log(trip);
          databaseService.saveBill(tripId, bill, callBack);
      }
      
      tripService.getTrips = function() {
          return tripService.tripList;
      };
      
      tripService.getTripNames = function() {
          var names = [];
          for(var i = 0; i < tripService.tripList.length; i++){
              names.push(tripService.tripList.name);
          }
          return names;
      }
      
      tripService.tripNameIsUnique = function(tripName){
          for(var i = 0; i < tripService.tripList.length; i++){
              if(tripService.tripList[i].name == tripName){
                  return false;
              }
          }
          return true;
      };
      
      tripService.getTripById = function(id){
          var trip = null;
          for(var i = 0; i < tripService.tripList.length; i++){
              if(tripService.tripList[i].id == id){
                  trip = tripService.tripList[i];
                  break;
              }
          }
          return trip;
      };
      
      
      
      return tripService;
    }]);