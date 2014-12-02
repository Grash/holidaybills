  var trip = angular.module('holidaybills');
  trip.controller('MenuCtrl', ['$scope','$routeParams', 'tripService', 'tripFactory', '$location', 'databaseService',function($scope, $routeParams, tripService, tripFactory, $location, databaseService) {
      this.isBrowser = function(){
          var ua = navigator.userAgent;
          var droid =  Boolean(ua.match(/android/i));
          var returnValue = !droid && (typeof (document.ontouchstart) == 'undefined');
//          console.log("Return value: ", returnValue);
          return returnValue;
      };
//      console.log("HOME");
      databaseService.initDatabase();
      this.test = true;
      $scope.$parent.browser = this.isBrowser();
      $scope.$parent.test = "" + window.screen.availWidth + ":"+window.screen.availHeight;
      
      this.initMockData = function(){
          var mockTrip = tripFactory.createNewMockTrip("Italy", [{name: "Andras", balance: 0}, {name: "Bela", balance: 0}]);
          
          var id = tripService.registerTrip(mockTrip);
//          console.log(id);
          alert("Mock data added");
      };
      
      this.newTripButtonClick = function(){
          $location.url("/new");
//          if (!$rootScope.$$phase) {
//              $rootScope.$apply(function(){           
//                  $location.path(articleUrl);
//              });
//          } else {
//              $location.url(articleUrl);
//          }
//          console.log("NEW TRIP");
      }
      
      this.resetDatabase = function(){
          databaseService.resetDb();
      }
      
      
    }]);