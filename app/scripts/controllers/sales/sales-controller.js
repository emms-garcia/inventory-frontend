/**
 * @ngdoc function
 * @name inventoryApp.controller:SalesController
 * @description
 * # SalesController
 * Controller of the inventoryApp
 */

(function () {
  'use strict';

  angular.module('inventoryApp')
    .controller('SalesController', SalesController);

  SalesController.$inject = ['userservice'];

  function SalesController (userservice) {
    var vm = this;
    vm.currentUser = userservice.currentUser;

    activate();

    function activate() {
      console.log('SalesController activated.');
    }

  }

})();
