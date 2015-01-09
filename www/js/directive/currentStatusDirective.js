var trip = angular.module('holidaybills');
  trip.directive('currentStatus', ['tripService', '$location', function(tripService, $location) {
      return {
          restrict: 'E',
          templateUrl: 'template/directive/currentStatus.html',
          link: function(scope, element, attrs){
              scope.participants = scope.openTrip.trip.participants;
          }
        };
    }]);