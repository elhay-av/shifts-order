export class MainController {
  constructor($mdSidenav) {
    'ngInject';

    this.toggleNavbar = () => {
      $mdSidenav('right').toggle();
    }
  }
}
