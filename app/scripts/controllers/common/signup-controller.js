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
			vm.password1 = null;
			vm.password2 = null;
			vm.firstName = null;
			vm.lastName = null;
			vm.username = null;
			vm.create = create;

			function create() {
				var data = {
					username: vm.username,
					password: vm.password1,
					first_name: vm.firstName,
					last_name: vm.lastName
				};

				userservice.createUser(data).then(function (success) {
					if(success) {
						$state.go('login');
					}
				});
			}
		}
})();
