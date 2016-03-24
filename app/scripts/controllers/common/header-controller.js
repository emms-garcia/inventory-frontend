/**
 * @ngdoc function
 * @name inventoryApp.controller:HeaderController
 * @description
 * # HeaderController
 * Controller of the inventoryApp
 */

(function () {
	'use strict';

	angular.module('inventoryApp')
		.controller('HeaderController', HeaderController);

		HeaderController.$inject = ['$state', 'userservice'];

		function HeaderController($state, userservice) {
			var vm = this;
			vm.logOut = logOut;
			vm.currentUser = userservice.currentUser;

			activate();

			function logOut() {
				userservice.logOut().then(function(loggedOut) {
					if(loggedOut) {
						$state.go('login');
					}
				});
			}

			function activate() {
				console.log('HeaderController activated.');
			}
		}
})();
