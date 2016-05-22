/**
 * @ngdoc function
 * @name inventoryApp.controller:InventoryController
 * @description
 * # InventoryController
 * Controller of the inventoryApp
 */

(function () {
  'use strict';

  angular.module('inventoryApp')
    .controller('InventoryController', InventoryController);

  InventoryController.$inject = ['userservice'];

  function InventoryController (userservice) {
    var vm = this;
    vm.currentUser = userservice.currentUser;

    activate();

    function activate() {
      console.log('InventoryController activated.');
    }
  }
})();
