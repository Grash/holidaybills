var trip = angular.module('holidaybills');
  trip.directive('listBills', ['tripService', '$location', function(tripService, $location) {
      return {
          restrict: 'E',
          templateUrl: 'template/directive/listBills.html',
          //scope: { },
          link: function(scope, element, attrs){
              scope.trip = scope.openTrip.trip;
              console.log(scope.trip);
              
              scope.openBill = function(billName){
                  scope.activeBill = scope.trip.getBillByName(billName);
                  scope.openTrip.changeSubPage(3);
              };
          }
        };
    }]);