/**
 * @ngdoc function
 * @name inventoryApp.controller:ClientsController
 * @description
 * # ClientsController
 * Controller of the inventoryApp
 */

(function () {
  'use strict';

  angular.module('inventoryApp')
    .controller('ClientsController', ClientsController);

  ClientsController.$inject = ['$modal', 'userservice', 'clientsservice', 'utilsservice'];

  function ClientsController ($modal, userservice, clientsservice, utilsservice) {
    var vm = this;
    vm.currentUser = userservice.currentUser;
    vm.openCreateClientModal = openCreateClientModal;
    vm.deleteClient = deleteClient;
    vm.clients = [];

    activate();

    function openCreateClientModal() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/clients/modals/create-client.html',
        controller: 'CreateClientModalController as vm',
        size: 'lg'
      });
      modalInstance.result.then(function () {
        clientsservice.getClientList().then(function (data) {
          vm.clients = data;
        });
      });
    }

    function deleteClient(id) {
      utilsservice.confirmationDialog(function () {
        clientsservice.deleteClient(id).then(function (data) {
          if (data) {
            clientsservice.getClientList().then(function (data) {
              vm.clients = data;
            });
          }
        });
      }, null, {
        bodyMsg: utilsservice.translate('DELETE_CLIENT_CONFIRM_BODY'),
        titleMsg: utilsservice.translate('DELETE_CLIENT_CONFIRM_TITLE'),
      });
    }

    function activate() {
      console.log('ClientsController activated.');
      clientsservice.getClientList().then(function (data){
        vm.clients = data;
      });
    }
  }
})();
