var trip = angular.module('holidaybills');
  trip.directive('tripLoadingCard', ['tripService', '$location', function(tripService, $location) {
      var createImgElement = function(element){
          var elem = {};
//          img.element = element;
          elem.card = element.find('.cardImg');
          
          elem.activateCard = function(){
              elem.card.addClass("cardImg_active");
              elem.card.find('.tripText').removeClass("hideCardText");
          };
          
          elem.inactivateCard = function(){
              elem.card.removeClass("cardImg_active");
              elem.card.find('.tripText').addClass("hideCardText");
          };
          
          elem.isActiveCard = function(){
              return elem.card.attr("class").indexOf("cardImg_active") > -1;
          };
          return elem;
      };
      
      var getPreviouslyActiveCardElement = function(element){
          var img = {};
          img.element = element;
          img.resetCard = function(){
              var elem = img.element.parent().parent().find(".cardImg_active");
              elem.removeClass("cardImg_active");
              elem.find('.tripText').addClass("hideCardText");
          };
          
          return img;
      };
      
      return {
          restrict: 'E',
          scope: {
              active: '=',
              card: '='
          },
          templateUrl: 'template/directive/tripLoadingCard.html',
          link: function postLink(scope, element, attr) {
              scope.emptySlot = !(typeof scope.card === 'object');
//              console.log("Part", scope.card.participants);
//              console.log("CARD", scope.card);
              if(attr.firstcard != null && attr.firstcard == "true"){
                  element.find('.availableTripCard').addClass('firstCard');
              }
              scope.activeClass=false;
//              console.log("DIRECTIVE");
              scope.cardSelect = function(){
                  var img = createImgElement(element);
                  if(img.isActiveCard()){
                      img.inactivateCard();
                  } else {
                      var prevImg = getPreviouslyActiveCardElement(element);
                      prevImg.resetCard();
                      img.activateCard();
                  }
//                  console.log("TRIP CARD");
              };
              
              scope.openTrip = function(tripId){
                  console.log("OpenTrip");
                  $location.path("/trip/"+scope.card.id);
              };
          }
        };
    }]);