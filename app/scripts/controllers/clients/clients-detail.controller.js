/**
 * @ngdoc function
 * @name inventoryApp.controller:ClientsDetailController
 * @description
 * # ClientsDetailController
 * Controller of the inventoryApp
 */

(function () {
  'use strict';

  angular.module('inventoryApp')
    .controller('ClientsDetailController', ClientsDetailController);

  ClientsDetailController.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    'uiGmapGoogleMapApi',
    'clientsservice',
    'utilsservice'
  ];

  function ClientsDetailController (
      $scope,
      $state,
      $stateParams,
      uiGmapGoogleMapApi,
      clientsservice,
      utilsservice) {

    var vm = this;
    vm.currentClient = null;
    vm.deleteClient = deleteClient;
    vm.updateClientData = updateClientData;
    vm.updateGeolocation = updateGeolocation;

    /* Scope, needed for GoogleMaps directives */
    $scope.map = {};
    $scope.marker = {
      id: 1,
      coords: {},
      options: { draggable: true }
    };

    activate();

    function updateClientData(key, value) {
      var data = {};
      data[key] = value;
      return clientsservice.updateClientData(vm.currentClient.id, data);
    }

    function updateGeolocation() {
      var data = {};
      data.latitude = $scope.marker.coords.latitude;
      data.longitude = $scope.marker.coords.longitude;
      return clientsservice.updateClientData(vm.currentClient.id, data).then(function (data) {
        if (data) {
          vm.currentClient.latitude = data.latitude;
          vm.currentClient.longitude = data.longitude;
        }
      });
    }

    function deleteClient() {
      utilsservice.confirmationDialog(function () {
        clientsservice.deleteClient(vm.currentClient.id).then(function (data){
          if (data) {
            $state.go('clients');
          }
        });
      });
    }

    function activate() {
      console.log('DirectoryController activated.');
      if ($stateParams.clientId) {
        clientsservice.getClientDetail($stateParams.clientId).then(function (data){
          if (data) {
            vm.currentClient = data;
            $scope.map = {
              center: {
                latitude: data.latitude,
                longitude: data.longitude
              },
              zoom: 16
            };
            $scope.marker.coords = $scope.map.center;
          } else {
            $state.go('clients');
          }
        });
      } else {
        $state.go('clients');
      }
    }
  }
})();
