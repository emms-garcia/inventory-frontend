import angular from 'angular';

import clientsservice from './clients.service.js';
import productservice from './product.service.js';
import translationloaderservice from './translation-loader.service.js';
import userservice from './user.service.js';
import utilsservice from './utils.service.js';
import warehousesservice from './warehouses.service.js';

export default angular.module('inventoryApp.services', [])
  .service('clientsservice', clientsservice)
  .service('productservice', productservice)
  .service('translationloaderservice', translationloaderservice)
  .service('userservice', userservice)
  .service('utilsservice', utilsservice)
  .service('warehousesservice', warehousesservice);