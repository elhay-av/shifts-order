/* global storage:false,  moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from '../app/views/main/main.controller';
import { ShiftController } from '../app/views/shift/ShiftController.js';
import { SettingsController } from '../app/views/settings/SettingsController.js';
import { Storage } from '../app/components/storage';

angular.module('shiftsOrder', [
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'ngMessages',
  'ngAria',
  'ui.router',
  'ngMaterial',
  'toastr',
  'LocalStorageModule',
  'pascalprecht.translate',
  'scDateTime'
])
  .value('scDateTimeConfig', {
    defaultTheme: 'material',
    autosave: true,
    defaultMode: 'date',
    defaultDate: undefined,
    displayMode: 'date',
    defaultOrientation: true,
    displayTwentyfour: false,
    compact: true
  })
  .value('scDateTimeI18n', {
    previousMonth: "Previous Month",
    nextMonth: "Next Month",
    incrementHours: "Increment Hours",
    decrementHours: "Decrement Hours",
    incrementMinutes: "Increment Minutes",
    decrementMinutes: "Decrement Minutes",
    switchAmPm: "Switch AM/PM",
    now: "Now",
    cancel: "Cancel",
    save: "Save",
    weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    switchTo: 'Switch to',
    clock: 'Clock',
    calendar: 'Calendar'
  })
  .constant('moment', moment)
  .constant('fileStorage', (typeof storage !== 'undefined') ? storage : false)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('Storage', Storage)
  .controller('MainController', MainController)
  .controller('ShiftController', ShiftController)
  .controller('SettingsController', SettingsController);
