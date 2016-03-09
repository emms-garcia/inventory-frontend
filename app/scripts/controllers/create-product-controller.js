/**
 * @ngdoc function
 * @name inventoryApp.controller:CreateProductModalController
 * @description
 * # CreateProductModalController
 * Controller of the inventoryApp
 */

(function () {
	'use strict';

	angular.module('inventoryApp')
		.controller('CreateProductModalController', CreateProductModalController);

		CreateProductModalController.$inject = ['$modalInstance', 'productservice'];

		function CreateProductModalController($modalInstance, productservice) {
			var vm = this;
			vm.create = create;
			vm.cancel = cancel;
			vm.activate = activate;

			vm.name = null;
			vm.description = null;
			vm.uom = { id: null };
			vm.pricePerUOM = 0.0;

			vm.filterUOMS = filterUOMS;
			vm.formatUOM = formatUOM;

			activate();

			function formatUOM(value) {
				if(value.id) {
					return value.name;
				}
			}

			function filterUOMS(string) {
				return productservice.filterUOMS(string);
			}

			function create() {
				productservice.createProduct({
					name: vm.name,
					description: vm.description,
					uom: vm.uom.resource_uri,
					price_per_uom: vm.pricePerUOM
				}).then(function (data) {
					if(data) {
						$modalInstance.close(data);
					}
				});
			}

			function cancel() {
				$modalInstance.dismiss('cancel');
			}

			function activate() {
				console.log('CreateProductModalController activated.');
			}
		}
})();
