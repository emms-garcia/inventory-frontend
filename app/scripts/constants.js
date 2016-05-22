/**
 * @ngdoc overview
 * @name inventoryApp
 * @description
 * # inventoryApp
 *
 * Main module of the application.
 */
(function() {
  'use strict';

  angular
    .module('inventoryApp')
    .constant('LOCAL_STORAGE_KEYS', {
      CURRENT_USER: 'CURRENT_USER'
    });

})();
