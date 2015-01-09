var trip = angular.module('holidaybills');
  trip.directive('newTripForm', ['tripService', 'validator', '$location', 'tripFactory', '$rootScope', function(tripService, validator, $location, tripFactory, $rootScope) {
      this.createParticipant = function(){
          var participant = {
                  name: "",
                  empty: false,
                  notUnique: false
          };
          return participant;
      };
      
      this.canAddNewParticipant = function(participants){
          var can = true;
          for(var i = 0; i < participants.length; i++){
              if("" == participants[i].name || null == participants[i].name || undefined == participants[i].name){
                  can = false;
                  participants[i].empty = true;
              }
          }
          return can;
      };
      
      this.createFormObject = function(){
          var form = {
                  tripName: {
                      value: "",
                      empty: false,
                      notUnique: false
                  },
                  participantList: [],
                  error: {
                      notEnoughName: false
                  }
          };
          form.participantList.push(this.createParticipant(), this.createParticipant());
          return form;
      };
      
      this.resetFormErrors = function(form){
          form.tripName.empty = false;
          form.tripName.notUnique = false;
          form.error.notEnoughName = false;
          for(var i = 0; i < form.participantList.length; i++){
              form.participantList[i].empty = false;
              form.participantList[i].notUnique = false;
          }
      }
      
      this.isValid = function(form){
          if(form.tripName.value != "" && form.tripName.value != undefined){
              form.tripName.notUnique = !tripService.tripNameIsUnique(form.tripName.value);
          } else {
              form.tripName.empty = true;
          }
          
          var uniqueNames = false;
          
          if(validator.checkMinimumName(form.participantList)){
              uniqueNames = validator.checkUniqueParticipantNames(form.participantList);
          } else {
              form.error.notEnoughName = true;
          }
          
          return !form.tripName.notUnique && !form.tripName.empty && uniqueNames;
      };
      
      return {
          restrict: 'E',
          templateUrl: 'template/directive/newTripForm.html',
          link: function postLink(scope, element, attrs) {
              scope.form = createFormObject();
              
              scope.addParticipant = function() {
                  if(canAddNewParticipant(scope.form.participantList)){
                      scope.form.participantList.push(createParticipant());
                  }                  
              };
              
              scope.tripId = 0;
              var unregister = scope.$watch(function(){return scope.tripId;}, function (newValue, oldValue) {
                  if(newValue != undefined && newValue != oldValue){
                      unregister();
                      $location.url("/trip/"+newValue);
                  }
              });
              
              scope.saveTrip = function() {
                  resetFormErrors(scope.form);
                  if(isValid(scope.form)){
                      var trip = tripFactory.createNewTripFromForm(scope.form);
                      tripService.registerTrip(trip, scope);
                  }
              };
          }
        };
    }]);