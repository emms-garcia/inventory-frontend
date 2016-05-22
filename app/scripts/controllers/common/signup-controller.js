/**
 * @ngdoc function
 * @name inventoryApp.controller:SignUpController
 * @description
 * # SignUpController
 * Controller of the inventoryApp
 */

(function () {
	'use strict';

	angular.module('inventoryApp')
		.controller('SignUpController', SignUpController);

		SignUpController.$inject = ['$state', '$translate', 'userservice'];

		function SignUpController($state, $translate, userservice) {
			var vm = this;
			vm.company = null;
			vm.firstName = null;
			vm.lastName = null;
			vm.password1 = null;
			vm.password2 = null;
			vm.username = null;

			vm.passwordsMatch = passwordsMatch;
			vm.create = create;

			function passwordsMatch() {
				return vm.password1 && vm.password2 && vm.password1 === vm.password2;
			}

			function create() {
				var data = {
					company: vm.company,
					first_name: vm.firstName,
					last_name: vm.lastName,
					password: vm.password1,
					username: vm.username
				};

				userservice.createUser(data).then(function (success) {
					if(success) {
						$state.go('login');
					}
				});
			}
		}
})();
