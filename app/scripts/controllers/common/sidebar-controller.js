/**
 * @ngdoc function
 * @name inventoryApp.controller:SidebarController
 * @description
 * # SidebarController
 * Controller of the inventoryApp
 */

(function () {
  'use strict';

  angular.module('inventoryApp')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = [];

  function SidebarController() {
    activate();

    function activate() {
      console.log('SidebarController activated.');
    }
  }
})();
