  var trip = angular.module('holidaybills');
  trip.controller('MenuCtrl', ['$scope','$routeParams', 'tripService', 'tripFactory', '$location', 'databaseService',function($scope, $routeParams, tripService, tripFactory, $location, databaseService) {
      this.isBrowser = function(){
          var ua = navigator.userAgent;
          var droid =  Boolean(ua.match(/android/i));
          var returnValue = !droid && (typeof (document.ontouchstart) == 'undefined');
          return returnValue;
      };

      if (typeof(window.openDatabase)=='undefined') {
          console.log("Database operations are not supported");
      } else {
          databaseService.initDatabase();
      }
      
      this.test = true;
      $scope.$parent.browser = this.isBrowser();
      $scope.$parent.test = "" + window.screen.availWidth + ":"+window.screen.availHeight;
      
      this.initMockData = function(){
          databaseService.resetDb();
          var mockTrip = tripFactory.createNewMockTrip("Greece", [{name: "Andras", balance: 0, id: 0}, {name: "Bela", balance: 0, id: 0}, {name: "Geza", balance: 0, id: 0}, {name: "Istvan", balance: 0, id: 0}, {name: "Jozsi", balance: 0, id: 0}]);
          var mockTrip2 = tripFactory.createNewMockTrip("Italy", [{name: "Andras", balance: 0, id: 0}, {name: "Bela", balance: 0, id: 0}]);
          
          tripService.registerTrip(mockTrip, $scope);
          tripService.registerTrip(mockTrip2, $scope);
          console.log("Mock data added");
      };
      
      this.newTripButtonClick = function(){
          $location.url("/new");
      };
      
      this.availableTripButtonClick = function(){
          $location.url("/trips");
      };
      
      this.resetDatabase = function(){
          databaseService.resetDb();
      };
      
      
    }]);