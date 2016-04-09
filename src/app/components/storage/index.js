import defaultEmployees from '../../default-data/employees.js';
import defaultShifts from '../../default-data/shifts.js';

const localPrefix = 'shifts_order';

export class Storage {
  constructor(localStorageService, fileStorage, $log) {
    'ngInject';

    this.$log = $log;
    this.storageProvider = (fileStorage) ? 'file' : 'local';
    this.Storage = fileStorage || localStorageService;

    this.getKey = (key, defer) => {
      if (this.storageProvider === 'file') {
        this.getFromFile(key, defer)
      }

      if (this.storageProvider === 'local') {
        this.getFromLocal(key, defer);
      }
    };
    this.getFromFile = (key, defer) => {
      this.Storage.get(localPrefix + '.' + key, function (err, data) {
        if (err) {
          $log.error('Get from file, ', key, err);
          defer.reject(err);
        }
        defer.resolve(data);
      });
    };
    this.getFromLocal = (key, defer) => {
      defer.resolve(this.Storage.get(key));
    };

    this.setkey = (key, defer, data) => {
      if (this.storageProvider === 'file') {
        this.setFromFile(key, defer, data)
      }

      if (this.storageProvider === 'local') {
        this.setFromLocal(key, defer, data)
      }
    };
    this.setFromFile = (key, defer, data) => {
      this.Storage.set(localPrefix + '-' + key, data, function (err, data) {
        if (err) {
          $log.error('Set to file, ', key, err);
          defer.reject(err);
        }
        defer.resolve(data);
      });
    };
    this.setFromLocal = (key, defer, data) => {
      defer.resolve(this.Storage.set(key, data));
    };

    this.isInit = false;
    this.initDefer = Promise.all([
      this.initEmployees(),
      this.initShifts()
    ]);
    this.initData();
  }

  initData() {
    let that = this;
    this.initDefer.then(function(){
      that.isInit = true;
    });
  }
  initShifts(){
    let that = this;
    return this.getShifts(true).then(function (data) {
      if (!data) {
        that.setShifts(defaultShifts);
      }
    }, function (err) {
      that.$log.log('Setting default employees after error', err);
      that.setShifts(defaultShifts);
    })
  }
  initEmployees(){
    let that = this;
    return this.getEmployees(true).then(function (data) {
      if (!data) {
        that.setEmployees(defaultEmployees);
      }
    }, function (err) {
      that.$log.log('Setting default employees after error', err);
      that.setEmployees(defaultEmployees);
    })
  }

  getShifts(isInit) {
    let that = this;

    return new Promise(function(resolve, reject){
      let defer = {resolve, reject};

      if(!that.isInit && !isInit) {
        that.initDefer.then(function(){
          that.getKey('Shifts', defer);
        });
        return;
      }
      that.getKey('Shifts', defer);
    });
  }
  setShifts(data) {
    let that = this;
    return new Promise(function(resolve, reject){
      let defer = {resolve, reject};
      that.setkey('Shifts', defer, data);
    });
  }

  getEmployees(isInit) {
    let that = this;

    return new Promise(function(resolve, reject){
      let defer = {resolve, reject};

      if(!that.isInit && !isInit) {
        that.initDefer.then(function(){
          that.getKey('Employees', defer);
        });
        return;
      }
      that.getKey('Employees', defer);
    });
  }
  setEmployees(data) {
    let that = this;
    return new Promise(function(resolve, reject){
      let defer = {resolve, reject};
      that.setkey('Employees', defer, data);
    });
  }

  getDate(date) {
    let that = this;

    return new Promise(function(resolve, reject){
      let defer = {resolve, reject};

      that.getKey('Date-'+date, defer);
    });
  }
  setDate(data) {
    let that = this;
    return new Promise(function(resolve, reject){
      let defer = {resolve, reject};
      that.setkey('Date', defer, data);
    });
  }
}
