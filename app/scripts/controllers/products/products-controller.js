/**
 * @ngdoc function
 * @name inventoryApp.controller:ProductsController
 * @description
 * # ProductsController
 * Controller of the inventoryApp
 */

(function () {
	'use strict';
	
	angular.module('inventoryApp')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$modal', 'userservice', 'productservice'];

	function ProductsController ($modal, userservice, productservice) {
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
				templateUrl: 'views/products/modals/create-uom.html',
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
				templateUrl: 'views/products/modals/create-product.html',
				controller: 'CreateProductModalController as vm',
				size: 'lg'
			});

			modalInstance.result.then(function () {
				getProducts();
			});
		}

		function activate() {
			console.log('ProductsController activated.');

			getProducts();
			getUOMS();
		}

	}

})();
