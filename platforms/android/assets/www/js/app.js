  var trip = angular.module('tripBill', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'angularcarousel'
    ]);
  trip.config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
        console.log("route");
//        $routeProvider
//          .when('/', {
//              templateUrl: 'menu.html',
//              controller: 'MenuCtrl',
//              controllerAs: 'menu'
//          })
//          .when('/new', {
//              templateUrl: 'newTrip.html',
//              controller: 'NewTripCtrl',
//              controllerAs: 'newTrip'
//          })
//          .when('/trip/:tripId', {
//              templateUrl: 'openTrip.html',
//              controller: 'OpenTripCtrl',
//              controllerAs: 'openTrip'
//          })
//          .when('/trips', {
//              templateUrl: 'availableTrips.html',
//              controller: 'AvailableTripsCtrl',
//              controllerAs: 'availableTrips'
//          })
//          ;

        // configure html5 to get links working on jsfiddle
        //$locationProvider.html5Mode(true);
    }]);
  