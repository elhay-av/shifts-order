export function routerConfig ($stateProvider, $urlRouterProvider, moment) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('home.shift', {
      url: 'shift/:date',
      templateUrl: 'app/views/shift/shift.html',
      controller: 'ShiftController',
      controllerAs: 'shiftCtrl'
    })
    .state('home.settings', {
      url: 'settings',
      templateUrl: 'app/views/settings/settings.html',
      controller: 'SettingsController',
      controllerAs: 'settings'
    });

  $urlRouterProvider.otherwise('/shift/' + moment().format('MM-DD-YYYY'));
}
