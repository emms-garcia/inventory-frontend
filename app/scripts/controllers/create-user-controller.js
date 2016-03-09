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
			vm.readOnly = false;
			vm.create = create;
			vm.cancel = cancel;

			function create() {
				var data = {
					username: vm.username,
					password: vm.password1,
					first_name: vm.firstName,
					last_name: vm.lastName,
					is_staff: !vm.readOnly
				};

				userservice.createUser(data).then(function(data) {
					if (data) {
						$modalInstance.close(data);
					}
				});
			}

			function cancel() {
				$modalInstance.dismiss('cancel');
			}
		}
})();
