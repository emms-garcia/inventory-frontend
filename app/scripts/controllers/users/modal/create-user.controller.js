/**
 * @ngdoc function
 * @name inventoryApp.controller:CreateUserModalController
 * @description
 * # CreateUserModalController
 * Controller of the inventoryApp
 */

(function () {
  'use strict';

  angular.module('inventoryApp')
    .controller('CreateUserModalController', CreateUserModalController);

  CreateUserModalController.$inject = ['$modalInstance', '$translate', 'userservice'];

  function CreateUserModalController($modalInstance, $translate, userservice) {
    var vm = this;
    vm.password1 = null;
    vm.password2 = null;
    vm.firstName = null;
    vm.lastName = null;
    vm.username = null;

    vm.create = create;
    vm.cancel = cancel;
    vm.passwordsMatch = passwordsMatch;

    function create() {
      var data = {
        username: vm.username,
        password: vm.password1,
        first_name: vm.firstName,
        last_name: vm.lastName
      };

      userservice.createUser(data).then(function(data) {
        if (data) {
          $modalInstance.close(data);
        }
      });
    }

    function passwordsMatch() {
      return vm.password1 && vm.password2 && vm.password1 === vm.password2;
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    }
  }
})();
