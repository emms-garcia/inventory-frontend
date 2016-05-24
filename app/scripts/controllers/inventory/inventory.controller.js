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

  InventoryController.$inject = [
    '$modal',
    '$translate',
    'userservice',
    'productservice',
    'utilsservice',
    '_'
  ];

  function InventoryController (
      $modal,
      $translate,
      userservice,
      productservice,
      utilsservice,
      _) {

    var vm = this;
    vm.currentUser = userservice.currentUser;
    vm.productGroups = [];
    vm.products = [];
    vm.queryProducts = '';
    vm.queryProductGroups = '';

    vm.deleteSelectedProducts = deleteSelectedProducts;
    vm.deleteSelectedProductGroups = deleteSelectedProductGroups;
    vm.importProductsModal = importProductsModal;
    vm.openCreateProductModal = openCreateProductModal;
    vm.openCreateProductGroupModal = openCreateProductGroupModal;
    vm.openEditProductModal = openEditProductModal;
    activate();

    function getProducts() {
      productservice.getProductList().then(function (data) {
        if(data) {
          vm.products = data;
        }
      });
    }

    function getProductGroups() {
      productservice.getProductGroupList().then(function(data) {
        if(data) {
          vm.productGroups = data;
        }
      })
    }

    function openCreateProductModal() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/inventory/modals/create-product.html',
        controller: 'CreateProductModalController as vm',
        size: 'lg'
      });

      modalInstance.result.then(getProducts);
    }

    function openCreateProductGroupModal() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/inventory/modals/create-product-group.html',
        controller: 'CreateProductGroupModalController as vm',
        size: 'lg',
        resolve: {
          products: function () {
            return vm.products;
          }
        }
      });
      modalInstance.result.then(getProductGroups);
    }

    function openEditProductModal(product) {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/inventory/modals/edit-product.html',
        controller: 'EditProductModalController as vm',
        size: 'md',
        resolve: {
          product: function () {
            return product;
          }
        }
      });
    }

    function deleteSelectedProducts() {
      var data = [];
      _.forEach(vm.products, function (product) {
        if(product.selected) {
          data.push(product.resource_uri);
        }
      })

      if(data.length > 0) {
        utilsservice.confirmationDialog(function () {
          productservice.deleteProducts(data).then(getProducts);
        });
      }
    }

    function deleteSelectedProductGroups() {
      var data = [];
      _.forEach(vm.productGroups, function (group) {
        if(group.selected) {
          data.push(group.resource_uri);
        }
      });

      if(data.length > 0) {
        utilsservice.confirmationDialog(function () {
          productservice.deleteProductGroups(data).then(getProductGroups);
        });
      }
    }

    function importProductsModal() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/inventory/modals/import-products.html',
        controller: 'ImportProductsController as vm',
        size: 'lg'
      });
      modalInstance.result.then(getProducts);
    }

    function activate() {
      console.log('InventoryController activated.');
      getProductGroups();
      getProducts();
    }
  }
})();
