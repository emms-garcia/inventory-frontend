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

  ProductsController.$inject = [
    '$modal',
    '$translate',
    'userservice',
    'productservice',
    'utilsservice'
  ];

  function ProductsController (
      $modal,
      $translate,
      userservice,
      productservice,
      utilsservice) {

    var vm = this;
    vm.currentUser = userservice.currentUser;
    vm.product_groups = [];
    vm.products = [];

    vm.deleteProduct = deleteProduct;
    vm.deleteProductGroup = deleteProductGroup;
    vm.openCreateProductModal = openCreateProductModal;
    vm.openCreateProductGroupModal = openCreateProductGroupModal;

    activate();

    function deleteProduct(productID) {
      utilsservice.confirmationDialog(function () {
        productservice.deleteProduct(productID).then(getProducts);
      });
    }

    function deleteProductGroup(productGroupID) {
      utilsservice.confirmationDialog(function () {
        productservice.deleteProductGroup(productGroupID).then(getProductGroups);
      });
    }

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
          vm.product_groups = data;
        }
      })
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

    function openCreateProductGroupModal() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/products/modals/create-product-group.html',
        controller: 'CreateProductGroupModalController as vm',
        size: 'lg',
        resolve: {
          products: function () {
            return vm.products;
          }
        }
      });

      modalInstance.result.then(function () {
        getProductGroups();
      });
    }

    function activate() {
      console.log('ProductsController activated.');

      getProductGroups();
      getProducts();
    }
  }

})();
