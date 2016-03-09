/**
 * @ngdoc function
 * @name inventoryApp.controller:InventoryController
 * @description
 * # InventoryController
 * Controller of the inventoryApp
 */

(function () {
	'use strict';
	
	angular.module('inventoryApp')
		.controller('InventoryController', InventoryController);

	InventoryController.$inject = ['$modal', 'userservice', 'productservice'];

	function InventoryController ($modal, userservice, productservice) {
		var vm = this;
		vm.currentUser = userservice.currentUser;
		vm.product_groups = [];
		vm.products = [];
		vm.uoms = [];

		vm.openCreateUOMModal = openCreateUOMModal;
		vm.openCreateProductModal = openCreateProductModal;

		activate();

		function getProducts() {
			productservice.getProductList().then(function (data) {
				if(data) {
					vm.products = data;
				}
			});
		}

		function getUOMS() {
			productservice.getUOMList().then(function (data) {
				if(data) {
					vm.uoms = data;
				}
			});
		}

		function openCreateUOMModal() {
			var modalInstance = $modal.open({
				animation: true,
				templateUrl: 'views/inventory/modals/create-uom.html',
				controller: 'CreateUOMModalController as vm',
				size: 'lg'
			});

			modalInstance.result.then(function () {
				getUOMS();
			});
		}

		function openCreateProductModal() {
			var modalInstance = $modal.open({
				animation: true,
				templateUrl: 'views/inventory/modals/create-product.html',
				controller: 'CreateProductModalController as vm',
				size: 'lg'
			});

			modalInstance.result.then(function () {
				getProducts();
			});
		}

		function activate() {
			console.log('InventoryController activated.');

			getProducts();
			getUOMS();
		}

	}

})();
