/**
 * @ngdoc function
 * @name inventoryApp.controller:ConfirmationDialogModalController
 * @description
 * # ConfirmationDialogModalController
 * Controller of the inventoryApp
 */

(function () {
  'use strict';

  angular.module('inventoryApp')
    .controller('ConfirmationDialogModalController', ConfirmationDialogModalController);

  ConfirmationDialogModalController.$inject = ['$modalInstance', '$translate', 'config'];

  function ConfirmationDialogModalController($modalInstance, $translate, config) {
    var vm = this;
    vm.confirm = $modalInstance.close;
    vm.cancel = $modalInstance.dismiss;
    vm.titleMsg = config.titleMsg || $translate.instant('CONFIRMATION_TITLE');
    vm.bodyMsg = config.bodyMsg || $translate.instant('CONFIRMATION_BODY');
    vm.confirmBtnMsg = config.confirmBtnMsg || $translate.instant('CONFIRMATION_CONFIRM');
    vm.cancelBtnMsg = config.cancelBtnMsg || $translate.instant('CONFIRMATION_CANCEL');
  }
})();
