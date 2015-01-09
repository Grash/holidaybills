  var trip = angular.module('holidaybills');
  trip.controller('OpenTripCtrl',['$scope','$routeParams','tripService', 'databaseService', function($scope, $routeParams, tripService, databaseService) {
      this.trip = tripService.getTripById($routeParams.tripId);
      this.tab = 0;
      
      this.testDb = function(){
          databaseService.testDb();
      };
      
      this.selectTab = function(tabId){
          this.tab = tabId;
      };
//      this.trip = tripService.getTripById($routeParams.tripId);
//      this.tripName = this.trip.name;
//      this.viewIndex = 0;
//      this.subPageStatus = [true, false, false]
//      this.changeSubPage = function(pageIndex){
//          this.subPageStatus = [false, false, false, false];
//          this.subPageStatus[pageIndex] = true;
//          //this.viewIndex = pageIndex;
//      };
    }]);