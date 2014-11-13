  var trip = angular.module('holidaybills', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'angularcarousel'
    ]);
  trip.config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
        console.log("route");
        var ua = navigator.userAgent;
        console.log("agent: ", ua);
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
  