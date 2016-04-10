export class ShiftController {
  constructor (Storage, $stateParams, $timeout) {
    'ngInject';

    this.theDate = $stateParams.date;
    this.shifts = {};
    this.employees = {};

    this.init(Storage, $timeout);
  }
  init(Storage, $timeout) {
    let that = this;
    Storage.getEmployees().then(function(data){
      $timeout(() => that.employees = data);
    });
    Storage.getShifts().then(function(shifts){

      Storage.getDate(that.theDate).then(function(date){
        $timeout(() => that.shifts = that.combineShifts(shifts, date));
      });
    });
  }
  combineShifts(shifts, currentDate){
    let combineObj = {};

    if(!currentDate){
      return shifts;
    }

    angular.forEach(shifts, function(val, key){
      combineObj[key] = Object.assign(val, currentDate[key]);
    });

    return combineObj;
  }
}
