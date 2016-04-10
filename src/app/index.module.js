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
  'pascalprecht.translate'
])
  .constant('moment', moment)
  .constant('fileStorage', (typeof storage !== 'undefined')? storage: false)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('Storage', Storage)
  .controller('MainController', MainController)
  .controller('ShiftController', ShiftController)
  .controller('SettingsController', SettingsController);
