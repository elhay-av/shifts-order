import i18nHe from './i18n/he.js';
import i18nEn from './i18n/en.js';
const i18Supports = ['he', 'en'];
const navigatorLang = () => {
  return navigator.language.split('-')[0];
};

export function config (
  $logProvider,
  toastrConfig,
  localStorageServiceProvider,
  moment,
  $translateProvider
) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  // config localStorage service
  localStorageServiceProvider
    .setPrefix('shifts_order')
    .setStorageType('localStorage')
    .setNotify(true, true);

  $translateProvider.useLocalStorage();
  $translateProvider.translations('he', i18nHe);
  $translateProvider.translations('en', i18nEn);

  $translateProvider.determinePreferredLanguage(function () {
    let storageLang = localStorage.getItem($translateProvider.storageKey());
    if(storageLang && i18Supports.indexOf( storageLang ) > -1) {
      return storageLang;
    }
    return (i18Supports.indexOf( navigatorLang() ) > -1)? navigatorLang(): i18Supports[0];
  });
  $translateProvider.use($translateProvider.preferredLanguage());
  $translateProvider.useSanitizeValueStrategy('');

  moment.locale($translateProvider.use());

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;
}
