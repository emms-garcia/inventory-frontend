/**
 * @ngdoc function
 * @name inventoryApp.controller:DirectoryController
 * @description
 * # DirectoryController
 * Controller of the inventoryApp
 */

(function () {
	'use strict';
	
	angular.module('inventoryApp')
		.controller('DirectoryController', DirectoryController);

	DirectoryController.$inject = ['userservice', 'directoryservice'];

	function DirectoryController (userservice, directoryservice) {
		var vm = this;
		vm.currentUser = userservice.currentUser;
		vm.clients = [];

		activate();

		function activate() {
			console.log('DirectoryController activated.');
			directoryservice.getClientList().then(function (data){
				vm.clients = data;			
			});
		}

	}

})();
