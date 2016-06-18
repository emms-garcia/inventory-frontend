export default class productservice {
  constructor($http, $translate, Upload, utilsservice) {
    this.$http = $http;
    this.$translate = $translate;
    this.Upload = Upload;
    this.utilsservice = utilsservice;

    this.$inject = ['$http', '$translate', 'Upload', 'utilsservice'];
  }

  deleteProductGroups(objects) {
    return this.$http({
      data: {
        deleted_objects: objects,
        objects: []
      },
      method: 'PATCH',
      url: '/api/inventory/product_groups/'
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('PRODUCT_GROUP_DELETE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on deleteProductGroups ' + error);
      this.utilsservice.notifyError(this.$translate.instant('PRODUCT_GROUP_DELETE_FAILED'));
      return false;
    });
  }

  createProductGroup(data) {
    return this.$http({
      method: 'POST',
      data: data,
      url: '/api/inventory/product_groups/'
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('PRODUCT_GROUP_CREATE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on createProductGroup ' + error);
      this.utilsservice.notifyError(this.$translate.instant('PRODUCT_GROUP_CREATE_FAILED'));
      if(error.data.product_groups) {
        for(const key in data) {
          if(error.data.product_groups[key]) {
            this.utilsservice.notifyError(error.data.product_groups[key][0]);
          }
        }
      }
      return false;
    });
  }

  getProductGroupList() {
    return this.$http({
      method: 'GET',
      url: '/api/inventory/product_groups/'
    })
    .then((response) => {
      return response.data.objects;
    })
    .catch((error) => {
      console.log('XHR failed on getProductGroupList ' + error);
      this.utilsservice.notifyError(this.$translate.instant('PRODUCT_GROUP_LIST_FAILED'));
      return false;
    });
  }

  getProductList() {
    return this.$http({
      method: 'GET',
      url: '/api/inventory/products/'
    }).then((response) => {
      return response.data.objects;
    })
    .catch((error) => {
      console.log('XHR failed on getProductList ' + error);
      this.utilsservice.notifyError(this.$translate.instant('PRODUCT_LIST_FAILED'));
      return false;
    });
  }

  getProductDetail(id) {
    return this.$http({
      method: 'GET',
      url: '/api/inventory/products/' + id + '/'
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('XHR failed on getProductDetail ' + error);
      this.utilsservice.notifyError(this.$translate.instant('PRODUCT_DETAIL_FAILED'));
      return false;
    });
  }

  createProduct(data) {
    return this.$http({
      method: 'POST',
      data: data,
      url: '/api/inventory/products/'
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('PRODUCT_CREATE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on createProduct ' + error);
      this.utilsservice.notifyError(this.$translate.instant('PRODUCT_CREATE_FAILED'));
      if(error.data.products) {
        for(var key in data) {
          if(error.data.products[key]) {
            this.utilsservice.notifyError(error.data.products[key][0]);
          }
        }
      }
      return false;
    });
  }

  deleteProducts(objects) {
    return this.$http({
      data: {
        deleted_objects: objects,
        objects: []
      },
      method: 'PATCH',
      url: '/api/inventory/products/'
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('PRODUCTS_DELETE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on deleteProductError ' + error);
      if(error.status === 400) {
        this.utilsservice.notifyError(error.data.error);
      } else {
        this.utilsservice.notifyError(this.$translate.instant('PRODUCTS_DELETE_FAILED'));
      }
      return false;
    });
  }

  updateProductData(id, data) {
    return this.$http({
      method: 'PATCH',
      url: 'api/inventory/products/' + id + '/',
      data: data
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('UPDATE_PRODUCT_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR Failed for updateProductData ' + error.data);
      this.utilsservice.notifyError(this.$translate.instant('UPDATE_PRODUCT_FAILED'));
      if(error.data.products) {
        for(var key in error.data.products) {
          if(error.data.products[key]) {
            this.utilsservice.notifyError(error.data.products[key][0]);
          }
        }
      }
      return false;
    });
  }

  importProducts(file) {
    return this.Upload.upload({
        url: 'api/inventory/products/import/',
        data: { file: file }
    }).then((response) => {
      this.utilsservice.notifySuccess(this.$translate.instant('IMPORT_PRODUCTS_SUCCESS'));
      return response;
    });
  }

  getWarehouseProductStock(productId) {
    return this.$http({
      method: 'GET',
      params: {
        product: productId
      },
      url: '/api/inventory/warehouse_stocks/'
    })
    .then((response) => {
      return response.data.objects;
    })
    .catch((error) => {
      console.log('XHR failed on getWarehouseProductStock ' + error);
      this.utilsservice.notifyError(this.$translate.instant('WAREHOUSE_PRODUCT_STOCK_LIST_FAILED'));
      return false;
    });
  }
}
