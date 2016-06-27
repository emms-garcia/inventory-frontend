import angular from 'angular';

import productGroupCard from './product-group-card.directive';
import transactionHistory from './transaction-history.directive';

export default angular.module('inventoryApp.directives', [])
  .directive('productGroupCard', productGroupCard)
  .directive('transactionHistory', transactionHistory);
