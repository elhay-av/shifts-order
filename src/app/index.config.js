export function config ($logProvider, toastrConfig, localStorageServiceProvider, moment) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  localStorageServiceProvider
    .setPrefix('shifts_order')
    .setStorageType('localStorage')
    .setNotify(true, true);


  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;
}
