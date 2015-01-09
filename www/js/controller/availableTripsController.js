  var trip = angular.module('holidaybills');
  trip.controller('AvailableTripsCtrl',['$scope', '$location','tripService',  function($scope, $location, tripService) {
      var getParticipantsName = function(participants){
          var participantsName = [];
          
          for(var p = 0; p < participants.length; p++){
              participantsName.push(participants[p].name);
          };
          
          return participantsName;
      };
      
      var convertTripToCardData = function(trip){
          var card = {
                  id: trip.id,
                  tripName: trip.name,
                  participants: getParticipantsName(trip.participants)
          };
          
          return card;
      };
      
      var createModelDataFromTrips = function(trips){
          var cards = [];
          for(var i = 0; i < trips.length; i++){
              var trip = trips[i];
              
              cards.push(convertTripToCardData(trip));
          }
          if(cards.length < 4){
              for( var j = cards.length; j < 4; j++){
                  cards.push("empty" + j);
              }
          }
          return cards;
      };
      
      var trips = tripService.getTrips();
      this.cards = createModelDataFromTrips(trips);
      
      this.next = function(){
          this.carouselIndex += 1;
      }
      
      $scope.slides = [
                       {
                           id: 1
                       }
                       ];
      /*this.openTrip = function(tripId){
          $location.path("/trip/"+tripId);
      };*/
      
      /*this.cards = [
                    {
                        tripName: "Italy",
                        participants: ["Jozsi","Geza"]
                    },
                    {
                        tripName: "Greece",
                        participants: ["Pista","Jozsi"]
                    },
                    {
                        tripName: "Spain",
                        participants: ["Pista","Jozsi"]
                    },
                    {
                        tripName: "France",
                        participants: ["Pista","Jozsi"]
                    }
                    ];*/
    }]);