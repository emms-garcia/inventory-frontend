/**
 * @ngdoc function
 * @name inventoryApp.controller:DashboardController
 * @description
 * # DashboardController
 * Controller of the inventoryApp
 */

(function () {
	'use strict';

	angular.module('inventoryApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['userservice'];

	function DashboardController (userservice) {
		var vm = this;
		vm.currentUser = userservice.currentUser;

		activate();

		function activate() {
			console.log('DashboardController activated.');
		}

	}

})();
