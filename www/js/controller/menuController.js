  var trip = angular.module('holidaybills');
  trip.controller('MenuCtrl', ['$scope','$routeParams', 'tripService', 'tripFactory', function($scope, $routeParams, tripService, tripFactory) {
      this.isBrowser = function(){
          var ua = navigator.userAgent;
          var droid =  Boolean(ua.match(/android/i));
          return !droid && (typeof (document.ontouchstart) == 'undefined');
      };
      console.log("HOME");
      this.test = true;
      $scope.$parent.browser = this.isBrowser();
      $scope.$parent.test = "" + window.screen.availWidth + ":"+window.screen.availHeight;
      
      this.initMockData = function(){
          var mockTrip = tripFactory.createNewTrip("Italy", [{name: "Andras", balance: 0}, {name: "Bela", balance: 0}]);
          
          var id = tripService.registerTrip(mockTrip);
          console.log(id);
          alert("Mock data added");
      };
      
      
    }]);