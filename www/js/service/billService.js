var trip = angular.module('holidaybills');
trip.factory('billService', [ 'databaseService', function($location) {
    var billService = {};
    
    billService.setBalance = function(participants, owners, others, unit){
        for(var ow = 0; ow < owners.length; ow++){
            for(i = 0; i < participants.length; i++){
                if(participants[i].name == owners[ow].name){
                    if(owners[ow].share != "" && Number(owners[ow].share) != 0){
                        participants[i].balance += (owners[ow].amount-Number(owners[ow].share));
                    } else {
                        participants[i].balance += (owners[ow].amount-unit);
                    }
                }
            }
        };
        
        for(var ot = 0; ot < others.length; ot++){
            for(var j = 0; j < participants.length; j++){
                if(participants[j].name == others[ot].name){
                    if(others[ot].share != "" && Number(others[ot].share) != 0){
                        participants[j].balance -= Number(others[ot].share);
                    } else {
                        participants[j].balance -= unit;
                    }
                }
            }
        }
    };
    
    billService.isValid = function(bill, sum, shareSum, error){
        console.log("Bill: ", bill);
        error.resetErrors();
        var valid = true;
        if(sum <= 0){
            error.errorText = "Negativ or zero amount";
            valid = false;
        }
        if(valid && shareSum > sum){
            error.errorText = "Share is bigger than the amount";
            valid = false;
        }
        if(valid && bill.name.length == 0){
            valid = false;
            error.billName.empty = true;
            error.errorText = "Bill name is missing";
        }
        if(valid){
            console.log("Valid bill");
        } else {
            console.log("Invalid bill");
        }
        return valid;
    }
    
    return billService;
}]);
