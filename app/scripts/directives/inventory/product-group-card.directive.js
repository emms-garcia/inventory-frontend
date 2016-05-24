/**
 * @ngdoc function
 * @name inventoryApp.directive:productGroupCard
 * @description
 * # productGroupCard
 * Directive of the inventoryApp
 */

(function () {
  'use strict';

  angular.module('inventoryApp')
    .directive('productGroupCard', productGroupCard);

  function productGroupCard() {
    var directive = {
      restrict: 'E',
      templateUrl: 'views/inventory/directives/product-group-card.html',
      scope: {
        group: '='
      },
      controller: ProductGroupCardController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  ProductGroupCardController.$inject = ['$scope', '_'];

  function ProductGroupCardController($scope, _) {
    var vm = this;

    activate();

    function activate() {
      console.log('ProductGroupCardController activated.');

    }
  }
})();
