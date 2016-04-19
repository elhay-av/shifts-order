export class SettingsController {
  constructor ($translate, $window) {
    'ngInject';

    this.langGroup = $translate.use();
    this.replaceLang = () => {
      $translate.use(this.langGroup);
      $window.location.reload()
    }
  }
}
