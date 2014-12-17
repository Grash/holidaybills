var trip = angular.module('holidaybills');
  trip.directive('tripLoadingCard', ['tripService', '$location', function(tripService, $location) {
      
      return {
          restrict: 'E',
          scope: {
              active: '=',
              card: '='
          },
          templateUrl: 'template/directive/tripLoadingCard.html',
          link: function postLink(scope, element, attr) {
              console.log("Part", scope.card.participants);
//              console.log("CARD", scope.card);
              if(attr.firstcard != null && attr.firstcard == "true"){
                  element.find('.availableTripCard').addClass('firstCard');
              }
              scope.activeClass=false;
              console.log("DIRECTIVE");
              scope.cardSelect = function(){
                  var img = element.find('.cardImg');
                  if(img.attr("class").indexOf("cardImg_active") > -1){
                      img.removeClass("cardImg_active");
                      img.find('.tripText').addClass("ng-hide");
                  } else {
                      var prevImg = element.parent().parent().find(".cardImg_active");
                      prevImg.removeClass("cardImg_active");
                      prevImg.find('.tripText').addClass("ng-hide");
                      img.addClass("cardImg_active");
                      img.find('.tripText').removeClass("ng-hide");
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