/**
 * @ngdoc factory
 * @name inventoryApp.productservice
 * @description
 * # productservice
 * Service in the inventoryApp.
 */
(function() {
  'use strict';
  angular.module('inventoryApp')
    .factory('productservice', productservice);

  productservice.$inject = ['$http', '$translate', 'utilsservice'];

  function productservice($http, $translate, utilsservice) {
    var service = {
      getProductList: getProductList,
      getProductDetail: getProductDetail,
      createProduct: createProduct,
      deleteProduct: deleteProduct,
      getProductGroupList: getProductGroupList,
      createProductGroup: createProductGroup,
      deleteProductGroup: deleteProductGroup
    };

    function deleteProductGroup(id) {
      return $http({
        method: 'DELETE',
        url: '/api/inventory/product_groups/' + id + '/'
      }).then(deleteProductGroupSuccess)
      .catch(deleteProductGroupError);

      function deleteProductGroupSuccess() {
        utilsservice.notifySuccess($translate.instant('PRODUCT_GROUP_DELETE_SUCCESS'));
        return true;
      }

      function deleteProductGroupError(error) {
        console.log('XHR failed on deleteProductGroupError ' + error);
        utilsservice.notifyError($translate.instant('PRODUCT_GROUP_DELETE_FAILED'));
        return false;
      }
    }

    function createProductGroup(data) {
      return $http({
        method: 'POST',
        data: data,
        url: '/api/inventory/product_groups/'
      }).then(createProductGroupSuccess)
      .catch(createProductGroupError);

      function createProductGroupSuccess() {
        utilsservice.notifySuccess($translate.instant('PRODUCT_GROUP_CREATE_SUCCESS'));
        return true;
      }

      function createProductGroupError(error) {
        console.log('XHR failed on createProductGroupError ' + error);
        utilsservice.notifyError($translate.instant('PRODUCT_GROUP_CREATE_FAILED'));
        if(error.data.product_groups) {
          for(var key in data) {
            if(error.data.product_groups[key]) {
              utilsservice.notifyError(error.data.product_groups[key][0]);
            }
          }
        }
        return false;
      }
    }

    function getProductGroupList() {
      return $http({
        method: 'GET',
        url: '/api/inventory/product_groups/'
      }).then(getProductGroupListSuccess)
      .catch(getProductGroupListError);

      function getProductGroupListSuccess(response) {
        return response.data.objects;
      }

      function getProductGroupListError(error) {
        console.log('XHR failed on getProductGroupListError ' + error);
        utilsservice.notifyError($translate.instant('PRODUCT_GROUP_LIST_FAILED'));
        return false;
      }
    }

    function getProductList() {
      return $http({
        method: 'GET',
        url: '/api/inventory/products/'
      }).then(getProductListSuccess)
      .catch(getProductListError);

      function getProductListSuccess(response) {
        return response.data.objects;
      }

      function getProductListError(error) {
        console.log('XHR failed on getProductListError ' + error);
        utilsservice.notifyError($translate.instant('PRODUCT_LIST_FAILED'));
        return false;
      }
    }

    function getProductDetail(id) {
      return $http({
        method: 'GET',
        url: '/api/inventory/products/' + id + '/'
      }).then(getProductDetailSuccess)
      .catch(getProductDetailError);

      function getProductDetailSuccess(response) {
        return response.data;
      }

      function getProductDetailError(error) {
        console.log('XHR failed on getProductDetailError ' + error);
        utilsservice.notifyError($translate.instant('PRODUCT_DETAIL_FAILED'));
        return false;
      }
    }

    function createProduct(data) {
      return $http({
        method: 'POST',
        data: data,
        url: '/api/inventory/products/'
      }).then(createProductSuccess)
      .catch(createProductError);

      function createProductSuccess() {
        utilsservice.notifySuccess($translate.instant('PRODUCT_CREATE_SUCCESS'));
        return true;
      }

      function createProductError(error) {
        console.log('XHR failed on createProductError ' + error);
        utilsservice.notifyError($translate.instant('PRODUCT_CREATE_FAILED'));
        if(error.data.products) {
          for(var key in data) {
            if(error.data.products[key]) {
              utilsservice.notifyError(error.data.products[key][0]);
            }
          }
        }
        return false;
      }
    }

    function deleteProduct(id) {
      return $http({
        method: 'DELETE',
        url: '/api/inventory/products/' + id + '/'
      }).then(deleteProductSuccess)
      .catch(deleteProductError);

      function deleteProductSuccess() {
        utilsservice.notifySuccess($translate.instant('PRODUCT_DELETE_SUCCESS'));
        return true;
      }

      function deleteProductError(error) {
        console.log('XHR failed on deleteProductError ' + error);
        if(error.status === 400) {
          utilsservice.notifyError(error.data.error);
        } else {
          utilsservice.notifyError($translate.instant('PRODUCT_DELETE_FAILED'));
        }
        return false;
      }
    }

    return service;
  }
})();
