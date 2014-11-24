  var trip = angular.module('holidaybills');
  trip.factory('validator', function() {
      var validator = {};
      
      validator.checkUniqueParticipantNames = function(participants){
          var everyNameUnique = true;
          for(var i = 0; i < participants.length-1; i++){
              for(var j = i+1; j < participants.length; j++){
                  if (participants[i].name != "" && participants[i].name != undefined && participants[i].name == participants[j].name){
                      everyNameUnique = false;
                      participants[i].notUnique = true;
                      participants[j].notUnique = true;
                  }
              }
          }
          return everyNameUnique;
      };
      
      validator.checkMinimumName = function(participants){
          var counter = 0;
          for(var i = 0; i < participants.length; i++){
              if(participants[i].name != "" && participants[i].name != undefined){
                  counter++;
              }
          }
          
          return counter > 1;
      };
      
      return validator;
    });