  var trip = angular.module('holidaybills');
  trip.controller('MenuCtrl', ['$routeParams', 'tripService', 'tripFactory', function($routeParams, tripService, tripFactory) {
      console.log("HOME");
      this.test = true;
      
      this.initMockData = function(){
          var mockTrip = tripFactory.createNewTrip("Italy", [{name: "Andras", balance: 0}, {name: "Bela", balance: 0}]);
          
          var id = tripService.registerTrip(mockTrip);
          console.log(id);
          alert("Mock data added");
      }
    }]);