export class MainController {
  constructor($mdSidenav, $state, moment) {
    'ngInject';

    this.currentDate = moment(new Date($state.params.date)).format('YYYY DD MMMM');
    this.toggleNavbar = () => {
      $mdSidenav('right').toggle();
    }
  }
}
