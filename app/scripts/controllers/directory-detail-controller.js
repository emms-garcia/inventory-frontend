/**
 * @ngdoc function
 * @name inventoryApp.controller:DirectoryDetailController
 * @description
 * # DirectoryDetailController
 * Controller of the inventoryApp
 */

(function () {
	'use strict';
	
	angular.module('inventoryApp')
		.controller('DirectoryDetailController', DirectoryDetailController);

	DirectoryDetailController.$inject = ['$scope', '$state', '$stateParams', 'uiGmapGoogleMapApi', 'directoryservice', utilsservice];

	function DirectoryDetailController ($scope, $state, $stateParams, uiGmapGoogleMapApi, directoryservice, utilsservice) {
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
			return directoryservice.updateClientData(vm.currentClient.id, data);
		}

		function updateGeolocation() {
			var data = {};
			data.latitude = $scope.marker.coords.latitude;
			data.longitude = $scope.marker.coords.longitude;
			return directoryservice.updateClientData(vm.currentClient.id, data).then(function (data) {
				if (data) {
					vm.currentClient.latitude = data.latitude;
					vm.currentClient.longitude = data.longitude;
				}
			});
		}

		function deleteClient(id) {
			utilsservice.confirmationDialog(function () {
				directoryservice.deleteClient(id).then(function (data){
					if (data) {
						$state.go('directory');
					}
				});
			});
		}

		function activate() {
			console.log('DirectoryController activated.');
			if ($stateParams.clientId) {
				directoryservice.getClientDetail($stateParams.clientId).then(function (data){
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
						$state.go('directory');
					}
				});
			} else {
				$state.go('directory');
			}
		}
	}

})();
