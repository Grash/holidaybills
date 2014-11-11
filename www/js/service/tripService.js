  var trip = angular.module('holidaybills');
  trip.factory('tripService', function() {
      var tripService = {};
      var id = 0;
      
      tripService.tripList = [];
      
      tripService.registerTrip = function(trip){
          trip.id = id++;
          trip.bills = [];
          tripService.tripList.push(trip);
          return trip.id;
      };
      
      tripService.getTrips = function() {
          return tripService.tripList;
      };
      
      tripService.getTripNames = function() {
          var names = [];
          for(var i = 0; i < tripService.tripList.length; i++){
              names.push(tripService.tripList.name);
          }
          console.log("trip names", names);
          return names;
      }
      
      tripService.tripNameIsUnique = function(tripName){
          for(var i = 0; i < tripService.tripList.length; i++){
              if(tripService.tripList[i].name == tripName){
                  console.log("SAME");
                  return false;
              }
          }
          console.log("UNIQUE");
          return true;
      };
      
      tripService.getTripById = function(id){
          return tripService.tripList[id];
      };
      
      
      
      return tripService;
    });