import angular from 'angular';

import productGroupCard from './product-group-card.directive.js';

export default angular.module('inventoryApp.directives', [])
  .directive('productGroupCard', productGroupCard);
