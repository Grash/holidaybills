var trip = angular.module('holidaybills');
  trip.directive('addBillForm', ['tripService', '$location', 'tripFactory', 'billService',  function(tripService, $location, tripFactory, billService) {
      var selectorId = 0;
      return {
          restrict: 'E',
          templateUrl: 'template/directive/addBillForm.html',
          scope: {
              
          },
          link: function(scope, element, attrs){
              scope.trip = scope.$parent.openTrip.trip;
              var optionList = ["(none)"];
              var actualOptionList = [];
              
              var copyOptionList = function(originalList){
                  var optionList = [];
                  for(var i = 0; i < originalList.length; i++){
                      optionList.push(originalList[i]);
                  }
                  return optionList;
              };
              for(var i = 0; i < scope.trip.participants.length; i++){
                  optionList.push(scope.trip.participants[i].name);
              }
              actualOptionList = copyOptionList(optionList);
              
              var refreshActualOptionList = function(oldValue, newValue){
                  if(actualOptionList.indexOf(newValue) != -1 && newValue != "(none)"){
                      actualOptionList.splice(actualOptionList.indexOf(newValue),1);
                  }
                  if(actualOptionList.indexOf(oldValue) == -1 && oldValue.length != 0){
                      actualOptionList.push(oldValue);
                  }
              };
              
              var resetBill = function(){
                  scope.bill = tripFactory.createNewBill();
                  scope.owners.splice(1, scope.owners.length-1);
                  scope.owners[0].name = '';
                  scope.owners[0].amount = 0;
                  scope.owners[0].share = 0;
                  scope.owners[0].optionList = copyOptionList(optionList);
                  scope.others.splice(1, scope.others.length-1);
                  scope.others[0].name = '';
                  scope.others[0].share = 0;
                  scope.others[0].optionList = copyOptionList(optionList);
                  selectorId = 2;
              };
              
              var initBill = function(){
                  scope.bill = tripFactory.createNewBill();
                  scope.owners = [{name: '', amount: 0, share: 0, optionList: [], id: selectorId}];
                  scope.owners[0].optionList = copyOptionList(optionList);
                  selectorId++;
                  scope.others = [];
                  scope.others.push({name: '', share: 0, optionList: [], id: selectorId});
                  scope.others[0].optionList = copyOptionList(optionList);
                  selectorId++;
              };
              initBill();
              
              var isDifferentData = function(oldData, newData){
                  return oldData != newData && newData != "{{owner.name}} {{owner.id}}" && (newData != undefined && newData.split(" ")[0].length != 0);
              };
              
              var restoreOldValue = function(oldValue){
                var oldName = oldValue.split(" ")[0];
                if(oldName.length != 0 && oldName != "(none)"){
                    for(var k = 0; k < scope.owners.length; k++){
                        if(scope.owners[k].optionList.indexOf(oldName) == -1){
                            scope.owners[k].optionList.push(oldName);
                        }
                    }
                    for(var j = 0; j < scope.others.length; j++){
                        if(scope.others[j].optionList.indexOf(oldName) == -1){
                            scope.others[j].optionList.push(oldName);
                        }
                    }
                }
              };
              
              var removeNewValue = function(newValue){
                  var newName = newValue.split(" ")[0];
                  var newId = newValue.split(" ")[1];
                  if('(none)' != newName){
                      for(var l = 0; l < scope.owners.length; l++){
                          if(scope.owners[l].id != newId){
                              var index = scope.owners[l].optionList.indexOf(newName);
                              scope.owners[l].optionList.splice(index,1);
                          }
                      }
                      for(var m = 0; m < scope.others.length; m++){
                          if(scope.others[m].id != newId){
                              var index = scope.others[m].optionList.indexOf(newName);
                              scope.others[m].optionList.splice(index,1);
                          }
                      }
                  }
              }
              
              scope.$watch(function(){
                      var values = "";
                      var selectors = element.find("select");
                      for(var i = 0; i < selectors.length; i++){
                          if(values.length != 0){
                              values += "/";
                          }
                          values += selectors[i].attributes['actual-select'].value;
                      }
                      return values;
                  }, function (newdata, olddata) {
                      if(newdata != olddata){
                          var newDataArray = newdata.split("/");
                          var oldDataArray = olddata.split("/");
                          if(newDataArray.length == oldDataArray.length){
                              for(var i = 0; i < oldDataArray.length; i++){
                                  if(isDifferentData(oldDataArray[i], newDataArray[i])){
                                      refreshActualOptionList(oldDataArray[i].split(" ")[0], newDataArray[i].split(" ")[0]);
                                      restoreOldValue(oldDataArray[i]);
                                      removeNewValue(newDataArray[i]);
                                  }
                              }
                          }
                      }
              });
              
              scope.addOwner = function(){
                  if(scope.owners.length < optionList.length-1){
                      scope.owners.push({name: '', amount: 0, share: 0, optionList: [], id: selectorId});
                      var oList = copyOptionList(actualOptionList);
                      scope.owners[scope.owners.length-1].optionList = oList;
                      selectorId++;
                  }
              };
              scope.addOther = function(){
                  if(scope.others.length < optionList.length-1){
                      scope.others.push({name: '', share: 0, optionList: [], id: selectorId});
                      var oList = copyOptionList(actualOptionList);
                      scope.others[scope.others.length-1].optionList = oList;
                      selectorId++;
                  }
              };
              
              var removeUnnecessaryOptionItems = function(items){
                  for(var i = 0; i < scope.owners.length; i++){
                      if(scope.owners[i].name != '' && scope.owners[i].name != '(none)'){
                          items.splice(items.indexOf(scope.owners[i].name),0);
                      }
                  }
                  for(var j = 0; j < scope.others.length; j++){
                      if(scope.others[j].name != '' && scope.others[j].name != '(none)'){
                          items.splice(items.indexOf(scope.others[j].name),0);
                      }
                  }
                  return items
              }
              
//              var isValid = function(bill){
//                  return true;
//              }
              
              var removeUnnecessaryElements = function(elements){
                  var i = 0;
                  while(i < elements.length){
                      if(elements[i].name == "(none)" || elements[i].name == ""){
                          elements.splice(i,1);
                      } else {
                          i++;
                      }
                  }
              };
              
              var convertBillOwners = function(owners){
                  var billOwners = [];
                  for(var i = 0; i < owners.length; i++){
                      var billOwner = {name: owners[i].name, amount: Number(owners[i].amount), share: Number(owners[i].share)};
                      billOwners.push(billOwner);
                  }
                  return billOwners;
              };
              
              var convertBillOthers = function(others){
                  var billOthers = [];
                  for(var i = 0; i < others.length; i++){
                      var billOther = {name: others[i].name, share: Number(others[i].share)};
                      billOthers.push(billOther);
                  }
                  return billOthers;
              };
              
              scope.saveBill = function(){
                  var sum = 0;
                  for(var i = 0; i < scope.owners.length; i++){
                      if(scope.owners[i].amount != ""){
                          sum += Number(scope.owners[i].amount);
                      }
                  }
                  
                  if(sum > 0 && billService.isValid(scope.bill)){
                      removeUnnecessaryElements(scope.owners);
                      removeUnnecessaryElements(scope.others);
                      partNumber = scope.owners.length + scope.others.length;
                      for(var j = 0; j < scope.others.length; j++){
                          if(scope.others[j].share != "" && Number(scope.others[j].share) != 0){
                              sum -= Number(scope.others[j].share);
                              partNumber--;
                          }
                      }
                      for(var k = 0; k < scope.owners.length; k++){
                          if(scope.owners[k].share != "" && Number(scope.owners[k].share) != 0){
                              sum -= Number(scope.owners[k].share);
                              partNumber--;
                          }
                      }
                      billService.setBalance(scope.trip.participants, scope.owners, scope.others, sum/partNumber);
                      scope.bill.sum = sum;
                      scope.bill.owners = convertBillOwners(scope.owners);
                      scope.bill.others = convertBillOthers(scope.others);
                      scope.trip.bills.push(scope.bill);
                      resetBill();
                      actualOptionList = copyOptionList(optionList);
                      scope.$parent.openTrip.selectTab(2);
                  }
              };
          }
        };
    }]);