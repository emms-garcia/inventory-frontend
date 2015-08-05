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

	DirectoryController.$inject = ['$modal', 'userservice', 'directoryservice', 'utilsservice'];

	function DirectoryController ($modal, userservice, directoryservice, utilsservice) {
		var vm = this;
		vm.currentUser = userservice.currentUser;
		vm.openCreateClientModal = openCreateClientModal;
		vm.deleteClient = deleteClient;
		vm.clients = [];

		activate();

		function openCreateClientModal() {
			var modalInstance = $modal.open({
				animation: true,
				templateUrl: 'views/directory/modals/create-client.html',
				controller: 'CreateClientModalController as vm',
				size: 'lg'
			});
			modalInstance.result.then(function () {
				directoryservice.getClientList().then(function (data){
					vm.clients = data;
				});
			});
		}

		function deleteClient(id) {
			utilsservice.confirmationDialog(function () {
				directoryservice.deleteClient(id).then(function (data){
					if (data) {
						directoryservice.getClientList().then(function (data){
							vm.clients = data;
						});
					}
				});
			});
		}

		function activate() {
			console.log('DirectoryController activated.');
			directoryservice.getClientList().then(function (data){
				vm.clients = data;
			});
		}
	}

})();
