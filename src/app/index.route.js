export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('home.shift', {
      url: 'shift',
      templateUrl: 'app/views/shift/shift.html',
      controller: 'ShiftController',
      controllerAs: 'shift'
    })
    .state('home.settings', {
      url: 'settings',
      templateUrl: 'app/views/settings/settings.html',
      controller: 'SettingsController',
      controllerAs: 'settings'
    });

  $urlRouterProvider.otherwise('/shift');
}
