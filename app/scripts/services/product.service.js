export default class productservice {
  constructor($http, $translate, Upload, utilsservice) {
    this.$http = $http;
    this.$translate = $translate;
    this.Upload = Upload;
    this.utilsservice = utilsservice;

    this.$inject = ['$http', '$translate', 'Upload', 'utilsservice'];
  }

  /* Products */
  createProduct(data) {
    return this.$http({
      method: 'POST',
      data: data,
      url: '/v1/inventory/products/'
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('PRODUCT_CREATE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on createProduct ' + error);
      this.utilsservice.notifyError(this.$translate.instant('PRODUCT_CREATE_FAILED'));
      if(error.data.products) {
        error.data.products.forEach((data) => {
          if(data) {
            this.utilsservice.notifyError(data[0]);
          }
        });
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
      url: '/v1/inventory/products/'
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('PRODUCTS_DELETE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on deleteProducts ' + error);
      if(error.status === 400) {
        this.utilsservice.notifyError(error.data.error);
      } else {
        this.utilsservice.notifyError(this.$translate.instant('PRODUCTS_DELETE_FAILED'));
      }
      return false;
    });
  }

  getProductDetail(id) {
    return this.$http({
      method: 'GET',
      url: '/v1/inventory/products/' + id + '/'
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

  getProductList() {
    return this.$http({
      method: 'GET',
      url: '/v1/inventory/products/'
    }).then((response) => {
      return response.data.objects;
    })
    .catch((error) => {
      console.log('XHR failed on getProductList ' + error);
      this.utilsservice.notifyError(this.$translate.instant('PRODUCT_LIST_FAILED'));
      return false;
    });
  }

  importProducts(file) {
    return this.Upload.upload({
        url: '/v1/inventory/products/import/',
        data: { file: file }
    }).then((response) => {
      this.utilsservice.notifySuccess(this.$translate.instant('IMPORT_PRODUCTS_SUCCESS'));
      return response;
    });
  }

  updateProduct(id, data) {
    return this.$http({
      method: 'PATCH',
      url: '/v1/inventory/products/' + id + '/',
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
        error.data.products.forEach((data) => {
          if(data) {
            this.utilsservice.notifyError(data[0]);
          }
        });
      }
      return false;
    });
  }

  /* Product Groups */
  createProductGroup(data) {
    return this.$http({
      method: 'POST',
      data: data,
      url: '/v1/inventory/product_groups/'
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('PRODUCT_GROUP_CREATE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on createProductGroup ' + error);
      this.utilsservice.notifyError(this.$translate.instant('PRODUCT_GROUP_CREATE_FAILED'));
      if(error.data.product_groups) {
        error.data.product_groups.forEach((data) => {
          if(data) {
            this.utilsservice.notifyError(data[0]);
          }
        });
      }
      return false;
    });
  }

  deleteProductGroups(objects) {
    return this.$http({
      data: {
        deleted_objects: objects,
        objects: []
      },
      method: 'PATCH',
      url: '/v1/inventory/product_groups/'
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

  getProductGroupList() {
    return this.$http({
      method: 'GET',
      url: '/v1/inventory/product_groups/'
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

  /* UOMs */

  /* Products */
  createUOM(data) {
    return this.$http({
      method: 'POST',
      data: data,
      url: '/v1/inventory/uoms/'
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('UOM_CREATE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on createUOM ' + error);
      this.utilsservice.notifyError(this.$translate.instant('UOM_CREATE_FAILED'));
      return false;
    });
  }

  deleteUOMs(objects) {
    return this.$http({
      data: {
        deleted_objects: objects,
        objects: []
      },
      method: 'PATCH',
      url: '/v1/inventory/uoms/'
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('UOM_DELETE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on deleteUOMs ' + error);
      this.utilsservice.notifyError(this.$translate.instant('UOM_DELETE_FAILED'));
      return false;
    });
  }

  getUOMList() {
    return this.$http({
      method: 'GET',
      url: '/v1/inventory/uoms/'
    }).then((response) => {
      return response.data.objects;
    })
    .catch((error) => {
      console.log('XHR failed on getUOMList ' + error);
      this.utilsservice.notifyError(this.$translate.instant('UOM_LIST_FAILED'));
      return false;
    });
  }

  updateUOM(id, data) {
    return this.$http({
      method: 'PATCH',
      url: '/v1/inventory/uoms/' + id + '/',
      data: data
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('UPDATE_UOM_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR Failed for updateUOM ' + error.data);
      this.utilsservice.notifyError(this.$translate.instant('UPDATE_UOM_FAILED'));
      return false;
    });
  }

  /* Warehouse Stock */
  getWarehouseProductStock(productId) {
    return this.$http({
      method: 'GET',
      params: {
        product: productId
      },
      url: '/v1/inventory/warehouse_stocks/'
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
