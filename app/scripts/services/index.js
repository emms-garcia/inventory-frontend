import angular from 'angular';

import clientsservice from './clients.service';
import productservice from './product.service';
import transactionsservice from './transactions.service';
import translationloaderservice from './translation-loader.service';
import userservice from './user.service';
import utilsservice from './utils.service';
import warehousesservice from './warehouses.service';

export default angular.module('inventoryApp.services', [])
  .service('clientsservice', clientsservice)
  .service('productservice', productservice)
  .service('transactionsservice', transactionsservice)
  .service('translationloaderservice', translationloaderservice)
  .service('userservice', userservice)
  .service('utilsservice', utilsservice)
  .service('warehousesservice', warehousesservice);