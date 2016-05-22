/**
 * @ngdoc function
 * @name inventoryApp.controller:CreateProductModalController
 * @description
 * # CreateProductModalController
 * Controller of the inventoryApp
 */

(function () {
  'use strict';

  angular.module('inventoryApp')
    .controller('CreateProductModalController', CreateProductModalController);

  CreateProductModalController.$inject = ['$modalInstance', 'productservice'];

  function CreateProductModalController($modalInstance, productservice) {
    var vm = this;
    vm.create = create;
    vm.cancel = cancel;
    vm.activate = activate;

    vm.name = null;
    vm.description = null;
    vm.pricePerUnit = 0.0;
    vm.quantity = 1;

    activate();

    function create() {
      productservice.createProduct({
        name: vm.name,
        description: vm.description,
        price_per_unit: vm.pricePerUnit,
        quantity: vm.quantity
      }).then(function (data) {
        if(data) {
          $modalInstance.close(data);
        }
      });
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

    function activate() {
      console.log('CreateProductModalController activated.');
    }
  }
})();
