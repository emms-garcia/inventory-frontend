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

	DashboardController.$inject = [];

	function DashboardController () {
		var vm = this;
		vm.test = 1;

		activate();

		function activate() {
			console.log('DashboardController activated.');
		}

	}

})();
