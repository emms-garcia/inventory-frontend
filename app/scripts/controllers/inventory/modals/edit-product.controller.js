/**
 * @ngdoc function
 * @name inventoryApp.controller:EditProductModalController
 * @description
 * # EditProductModalController
 * Controller of the inventoryApp
 */

(function () {
  'use strict';

  angular.module('inventoryApp')
    .controller('EditProductModalController', EditProductModalController);

  EditProductModalController.$inject = ['$modalInstance', 'product', 'productservice', '_'];

  function EditProductModalController($modalInstance, product, productservice, _) {
    var vm = this;
    vm.product = product;
    vm.stocks = [];
    vm.total = 0;

    vm.cancel = cancel;
    vm.updateProductData = updateProductData;

    activate();

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

    function updateProductData(key, value) {
      var data = {};
      data[key] = value;
      return productservice.updateProductData(vm.product.id, data);
    }

    function activate() {
      console.log('EditProductModalController activated.');
      productservice.getWarehouseProductStock(vm.product.id).then(function (data) {
        vm.stocks = data;
        vm.total = _.sumBy(vm.stocks, 'product.quantity');
      });
    }
  }
})();
