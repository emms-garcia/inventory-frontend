/**
 * @ngdoc function
 * @name inventoryApp.controller:CreateUOMModalController
 * @description
 * # CreateUOMModalController
 * Controller of the inventoryApp
 */

(function () {
	'use strict';

	angular.module('inventoryApp')
		.controller('CreateUOMModalController', CreateUOMModalController);

		CreateUOMModalController.$inject = ['$modalInstance', 'productservice'];

		function CreateUOMModalController($modalInstance, productservice) {
			var vm = this;
			vm.create = create;
			vm.cancel = cancel;
			vm.activate = activate;

			vm.name = null;
			vm.description = null;

			activate();

			function create() {
				productservice.createUOM({
					name: vm.name,
					description: vm.description
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
				console.log('CreateUOMModalController activated.');
			}
		}
})();
