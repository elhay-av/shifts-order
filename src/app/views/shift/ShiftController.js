export class ShiftController {
  constructor(Storage, $stateParams, $timeout) {
    'ngInject';

    this.theDate = $stateParams.date;
    this.shifts = {};
    this.employees = {};
    this.saveTimeout = '';
    this.init(Storage, $timeout);

    this.saveDate = (() => {
      let that = this;
      return () => {
        Storage.setDate(that.shifts, that.theDate);
      }
    })();
    this.onDataChange = (() => {
      let that = this;

      return () => {
        $timeout.cancel(that.saveTimeout);
        that.saveTimeout = $timeout(that.saveDate, 1000);
      }
    })();
    this.addEmployee = (() => {
      let that = this;
      return (shiftOrder) => {
        shiftOrder.push({});
        that.onDataChange();
      };
    })();
    this.removeEmployee = (() => {
      let that = this;
      return (shiftOrder, $index) => {
        shiftOrder.splice($index, 1);
        that.onDataChange();
      }
    })();
  }

  init(Storage, $timeout) {
    let that = this;
    Storage.getEmployees().then(function (data) {
      $timeout(() => that.employees = data);
    });
    Storage.getShifts().then(function (shifts) {

      Storage.getDate(that.theDate).then(function (date) {
        $timeout(() => that.shifts = that.combineShifts(shifts, date));
      });
    });
  }

  combineShifts(shifts, currentDate) {
    let combineObj = {};

    if (!currentDate) {
      return shifts;
    }

    angular.forEach(shifts, function (val, key) {
      combineObj[key] = Object.assign(val, currentDate[key]);
    });

    return combineObj;
  }
}
