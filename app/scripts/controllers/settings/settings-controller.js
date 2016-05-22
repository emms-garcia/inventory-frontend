/**
 * @ngdoc function
 * @name inventoryApp.controller:SettingsController
 * @description
 * # SettingsController
 * Controller of the inventoryApp
 */

(function () {
  'use strict';

  angular.module('inventoryApp')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['userservice'];

  function SettingsController(userservice) {
    var vm = this;

    vm.currentUser = userservice.currentUser;

    function activate() {
      console.log('Activate SettingsController');
    }
  }
})();
