var trip = angular.module('holidaybills');
  trip.directive('newTripForm', ['tripService', '$location', 'tripFactory', function(tripService, $location, tripFactory) {
      return {
          restrict: 'E',
          templateUrl: 'template/directive/newTripForm.html',
          scope: {
              tripName: '@',
          } ,
          link: function postLink(scope, element, attrs) {
              scope.tripNameNotUnique = false;
              scope.participantList = [{ name: '', required: false, balance: 0}, { name: '', required: false, balance: 0}];
              var getParticipants = function(element){
                  var participants = [];
                  var partList = $( "#newTripFormContainer" ).find( "div.participant .participantName" );
                  for(var i = 0; i < partList.length; i++){
                      participants.push(partList[i].value);
                  }
                  console.log(participants);
                  return participants;
              }
              
              var isValid = function(trip){
                  scope.tripNameNotUnique = !tripService.tripNameIsUnique(trip.name);
                  
                  return !scope.tripNameNotUnique;
              }
              scope.element = element;
              scope.addParticipant = function() {
                  scope.participantList.push({name: '', required: false, balance: 0});
                  
              }
              
              var saveTrip = function() {
                  var trip = tripFactory.createNewTrip(scope.tripName, scope.participantList);
                  console.log(scope.participantList);
                  if(isValid(trip)){
                      var tripId = tripService.registerTrip(trip);
                      $location.path("/trip/"+tripId);
                  }
              };
              
              scope.saveTrip =  saveTrip;
          }
        };
    }]);