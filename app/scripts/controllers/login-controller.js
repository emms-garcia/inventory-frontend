/**
 * @ngdoc function
 * @name inventoryApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the inventoryApp
 */
(function() {
	'use strict';

	angular
		.module('inventoryApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$state', 'userservice'];

	function LoginController($state, userservice) {
		var vm = this;

		vm.username = null;
		vm.password = null;
		vm.logIn = logIn;

		activate();

		/////////////////

		function logIn() {
			if(vm.username && vm.password) {
				userservice.logIn(vm.username, vm.password).then(function(loggedIn){
					if(loggedIn) {
						$state.go('dashboard');
					}
				});
			}
		}

		function activate() {
			console.log('Login Controller activated.');
		}
	}

})();
