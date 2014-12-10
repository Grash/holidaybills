  var trip = angular.module('holidaybills');
  trip.controller('OpenTripCtrl',['$scope','$routeParams','tripService', 'databaseService', function($scope, $routeParams, tripService, databaseService) {
//      console.log("OPEN", $routeParams);
      this.testDb = function(){
          databaseService.testDb();
      };
//      this.trip = tripService.getTripById($routeParams.tripId);
//      this.tripName = this.trip.name;
//      this.viewIndex = 0;
//      console.log("openCrtl", this.trip);
//      this.subPageStatus = [true, false, false]
//      this.changeSubPage = function(pageIndex){
//          this.subPageStatus = [false, false, false, false];
//          this.subPageStatus[pageIndex] = true;
//          //this.viewIndex = pageIndex;
//      };
    }]);