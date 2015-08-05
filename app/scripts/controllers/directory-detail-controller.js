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

	DirectoryDetailController.$inject = ['$scope', 'uiGmapGoogleMapApi', 'directoryservice', '$state', '$stateParams'];

	function DirectoryDetailController ($scope, uiGmapGoogleMapApi, directoryservice, $state, $stateParams) {
		var vm = this;
		vm.currentClient = {};
		vm.updateClientData = updateClientData;

		/* Scope, needed for GoogleMaps directives */
		$scope.map = {};
		$scope.marker = {
			options: {
				draggable: true
			},
			coords: {}
		};

		activate();

		function updateClientData(key, value) {
			var data = {};
			data[key] = value;
			return directoryservice.updateClientData(vm.currentClient.id, data);
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
						$scope.marker.coords = angular.copy($scope.map.center);
						$scope.marker.id = 1;
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
