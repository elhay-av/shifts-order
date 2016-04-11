import i18nHe from '../../i18n/he.js';
import i18nEn from '../../i18n/en.js';

export class MainController {
  constructor($scope, $mdSidenav, $state, moment, scDateTimeI18n, $translate) {
    'ngInject';
    this.$scope = $scope;
    this.selectedDate = {
      date: new Date($state.params.date)
    };

    Object.assign(scDateTimeI18n, ($translate.use() === 'he')? i18nHe.DATE_PICKER: i18nEn.DATE_PICKER);
    this.currentDate = moment(new Date($state.params.date)).format('YYYY DD MMMM');
    this.toggleNavbar = () => {
      $mdSidenav('right').toggle();
    };

    $scope.$watch('main.selectedDate', this.onDateChange(moment, $state), true);
  }

  onDateChange (moment, $state) {
    return (newValue, oldValue) => {
      if(newValue && newValue !== oldValue) {
        this.currentDate = moment(newValue.date).format('YYYY DD MMMM');
        $state.go('home.shift', {
          date: moment(newValue.date).format('MM-DD-YYYY')
        });
      }
    };
  }
}
