import angular from 'angular';

import productGroupCard from './product-group-card.directive';
import salesHistory from './sales-history.directive';

export default angular.module('inventoryApp.directives', [])
  .directive('productGroupCard', productGroupCard)
  .directive('salesHistory', salesHistory);
