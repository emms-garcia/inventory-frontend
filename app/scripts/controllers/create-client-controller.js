/**
 * @ngdoc function
 * @name inventoryApp.controller:CreateClientModalController
 * @description
 * # CreateClientModalController
 * Controller of the inventoryApp
 */

(function () {
	'use strict';

	angular.module('inventoryApp')
		.controller('CreateClientModalController', CreateClientModalController);

		CreateClientModalController.$inject = ['$scope', '$modalInstance', 'directoryservice'];

		function CreateClientModalController($scope, $modalInstance, directoryservice) {
			var vm = this;
			vm.create = create;
			vm.cancel = cancel;
			vm.activate = activate;

			vm.name = null;
			vm.email = null;
			vm.company = null;
			vm.rfc = null;
			vm.phone = null;
			vm.cellphone = null;
			vm.address = null;

			/* Scope, needed for GoogleMaps directives */
			$scope.map = { zoom: 12 };
			$scope.marker = {
				options: { draggable: true },
				coords: {},
				id: 1
			};

			activate();

			function create() {
				directoryservice.createClient({
					name: vm.name,
					email: vm.email,
					company: vm.company,
					rfc: vm.rfc,
					phone: vm.phone,
					cellphone: vm.cellphone,
					address: vm.address,
					latitude: $scope.marker.coords.latitude,
					longitude: $scope.marker.coords.longitude
				}).then(function (data) {
					if (data) {
						$modalInstance.close();
					}
				});
			}

			function cancel() {
				$modalInstance.dismiss('cancel');
			}

			function activate() {
				console.log('CreateClientModalController activated.');
				navigator.geolocation.getCurrentPosition(function (position) {
					$scope.map.center = {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude 
					};
					$scope.marker.coords = $scope.map.center;
				}, function (error) {
					console.log('Could not load current position :'+error);
					$scope.map.center = {
						latitude: 40.1451,
						longitude: -99.6680
					};
				});
			}
		}
})();
