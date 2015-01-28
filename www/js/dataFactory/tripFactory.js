var trip = angular.module('holidaybills');

trip.factory('tripFactory', function(){
    var factory = {};
    
    var getParticipants = function(participantList){
        var participants = [];
        for(var i = 0; i < participantList.length; i++){
            participants.push({name: participantList[i].name, balance: 0, id: 0});
        }
        return participants;
    };
    
    factory.createNewTripFromForm = function(form){
        console.log(form);
        var trip = {
            name: form.tripName.value,
            participants: getParticipants(form.participantList),
            bills: [],
            id: 0,
            setId: function(tripId){
                    this.id = tripId;
                },
            };
        trip.getBillByName = function(billName){
            var bill;
            for(var i = 0; i < trip.bills.length; i++){
                if(trip.bills[i].name == billName){
                    bill = trip.bills[i];
                    return bill;
                }
            }
            return null;
        };
                
        return trip;
    };
    
    factory.createNewMockTrip = function(tripName, tripParticipants){
        var trip = {
            name: tripName,
            participants: tripParticipants,
            bills: [],
            id: 0,
            setId: function(tripId){
                    this.id = tripId;
                },
            };
        trip.getBillByName = function(billName){
            var bill;
            for(var i = 0; i < trip.bills.length; i++){
                if(trip.bills[i].name == billName){
                    bill = trip.bills[i];
                    return bill;
                }
            }
            return null;
        }
        
        return trip;
    };
    
    factory.createNewBill = function(){
        var bill = {
                name: '',
                sum: 0,
                owners: [],
                others: []
        };
        return bill;
    };
    
    return factory;
    
});
