/**
 * @ngdoc function
 * @name inventoryApp.controller:ImportProductsController
 * @description
 * # ImportProductsController
 * Controller of the inventoryApp
 */

(function () {
  'use strict';

  angular.module('inventoryApp')
    .controller('ImportProductsController', ImportProductsController);

  ImportProductsController.$inject = ['$modalInstance', 'productservice', '$timeout'];

  function ImportProductsController($modalInstance, productservice, $timeout) {
    var vm = this;
    vm.f = null;
    vm.errFile = null;
    vm.errorMsg = null;

    vm.cancel = cancel;
    vm.importProducts = importProducts;
    vm.uploadFiles = uploadFiles;

    activate();

    function importProducts() {
      if (vm.f) {
          vm.f.upload = productservice.importProducts(vm.f);
          vm.f.upload.then(function (response) {
            $timeout(function () {
              vm.f.result = response.data;
              $modalInstance.close();
            });
          }, function (response) {
              if (response.status > 0) {
                vm.errorMsg = response.status + ': ' + response.data;
              }
          }, function (evt) {
            vm.f.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          });
      }
    }

    function uploadFiles(file, errFiles) {
        vm.f = file;
        vm.errFile = errFiles && errFiles[0];
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

    function activate() {
      console.log('ImportProductsController activated.');
    }
  }
})();
