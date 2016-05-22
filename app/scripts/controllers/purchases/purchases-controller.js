/**
 * @ngdoc function
 * @name inventoryApp.controller:PurchasesController
 * @description
 * # PurchasesController
 * Controller of the inventoryApp
 */

(function () {
  'use strict';

  angular.module('inventoryApp')
    .controller('PurchasesController', PurchasesController);

  PurchasesController.$inject = ['userservice'];

  function PurchasesController (userservice) {
    var vm = this;
    vm.currentUser = userservice.currentUser;

    activate();

    function activate() {
      console.log('PurchasesController activated.');
    }

  }

})();
