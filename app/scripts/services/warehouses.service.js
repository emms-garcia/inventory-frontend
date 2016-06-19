export default class warehousesservice {
  constructor($http, $translate, utilsservice) {
    this.$http = $http;
    this.$translate = $translate;
    this.utilsservice = utilsservice;

    this.$inject = ['$http', '$translate', 'utilsservice'];
  }

  getWarehouseList() {
    return this.$http({
      method: 'GET',
      url: '/api/inventory/warehouses/'
    })
    .then((response) => {
      return response.data.objects;
    })
    .catch((error) => {
      console.log('XHR failed on getWarehouseList ' + error);
      this.utilsservice.notifyError(this.$translate.instant('WAREHOUSE_LIST_FAILED'));
      return false;
    });
  }

  createWarehouse(data) {
    return this.$http({
      method: 'POST',
      data: data,
      url: '/api/inventory/warehouses/'
    })
    .then((response) => {
      this.utilsservice.notifySuccess(this.$translate.instant('WAREHOUSE_CREATE_SUCCESS'));
      return response.data;
    })
    .catch((error) => {
      console.log('XHR failed on createWarehouse ' + error);
      this.utilsservice.notifyError(this.$translate.instant('WAREHOUSE_CREATE_FAILED'));
      if(error.data.warehouses) {
        error.data.warehouses.forEach(function (error) {
          this.utilsservice.notifyError(error[0]);
        });
      }
      return false;
    });
  }

  deleteWarehouses(objects) {
    return this.$http({
      data: {
        deleted_objects: objects,
        objects: []
      },
      method: 'PATCH',
      url: '/api/inventory/warehouses/'
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('WAREHOUSES_DELETE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on deleteWarehouses ' + error);
      if(error.status === 400) {
        this.utilsservice.notifyError(error.data.error);
      } else {
        this.utilsservice.notifyError(this.$translate.instant('WAREHOUSES_DELETE_FAILED'));
      }
      return false;
    });
  }
}
