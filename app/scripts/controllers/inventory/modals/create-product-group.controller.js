/**
 * @ngdoc function
 * @name inventoryApp.controller:CreateProductGroupModalController
 * @description
 * # CreateProductGroupModalController
 * Controller of the inventoryApp
 */

(function () {
  'use strict';

  angular.module('inventoryApp')
    .controller('CreateProductGroupModalController', CreateProductGroupModalController);

  CreateProductGroupModalController.$inject = ['$modalInstance', 'products', 'productservice'];

  function CreateProductGroupModalController($modalInstance, products, productservice) {
    var vm = this;
    vm.activate = activate;
    vm.cancel = cancel;
    vm.create = create;
    vm.updateProductsInUse = updateProductsInUse;

    vm.name = null;
    vm.description = null;
    vm.products = products;
    vm.productPriceSum = 0.0;
    vm.productsInUse = false;

    activate();

    function updateProductsInUse() {
      vm.productPriceSum = 0.0;
      vm.productsInUse = false;
      angular.forEach(vm.products, function (product) {
        product.quantity_in_group = product.quantity_in_group || 1;
        if(product.use) {
          vm.productPriceSum += product.price_per_unit * product.quantity_in_group;
          vm.productsInUse = true;
        }
      });
    }

    function create() {
      var products = [];
      angular.forEach(vm.products, function (product) {
        if(product.use) {
          products.push({
            quantity: product.quantity_in_group,
            resource_uri: product.resource_uri
          });
        }
      });

      productservice.createProductGroup({
        name: vm.name,
        description: vm.description,
        products: products
      }).then(function (data) {
        if(data) {
          $modalInstance.close(data);
        }
      });
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

    function activate() {
      console.log('CreateProductGroupModalController activated.');
      updateProductsInUse();
    }
  }
})();
