import angular from 'angular';

import dataTable from './data-table.directive';
import productGroupCard from './product-group-card.directive';
import transactionHistory from './transaction-history.directive';

export default angular.module('inventoryApp.directives', [])
  .directive('myDataTable', dataTable)
  .directive('productGroupCard', productGroupCard)
  .directive('transactionHistory', transactionHistory);
