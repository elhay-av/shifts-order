/* global  moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from '../app/views/main/main.controller';
import { ShiftController } from '../app/views/shift/ShiftController.js';
import { SettingsController } from '../app/views/settings/SettingsController.js';

angular.module('shiftsOrder', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ngMaterial', 'toastr'])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('ShiftController', ShiftController)
  .controller('SettingsController', SettingsController);
