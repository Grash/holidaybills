  var trip = angular.module('holidaybills', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'angular-carousel'
    ]);
  trip.config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
        var ua = navigator.userAgent;
        $routeProvider
          .when('/', {
              templateUrl: 'template/menu.html',
              controller: 'MenuCtrl',
              controllerAs: 'menu'
            })
          .when('/new', {
              templateUrl: 'template/newTrip.html',
              controller: 'NewTripCtrl',
              controllerAs: 'newTrip'
          })
          .when('/trip/:tripId', {
              templateUrl: 'template/openTrip.html',
              controller: 'OpenTripCtrl',
              controllerAs: 'openTrip'
          })
          .when('/trips', {
              templateUrl: 'template/availableTrips.html',
              controller: 'AvailableTripsCtrl',
              controllerAs: 'availableTrips'
          })
          ;

        // configure html5 to get links working on jsfiddle
        //$locationProvider.html5Mode(true);
    }]);
  