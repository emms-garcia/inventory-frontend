export default class salesservice {
  constructor($http, $translate, utilsservice) {
    this.$http = $http;
    this.$translate = $translate;
    this.utilsservice = utilsservice;

    this.$inject = ['$http', '$translate', 'utilsservice'];
  }

  getSaleList() {
    return this.$http({
      method: 'GET',
      params: {
        type: 'sale'
      },
      url: '/v1/inventory/transactions/'
    })
    .then((response) => {
      return response.data.objects;
    })
    .catch((error) => {
      console.log('XHR failed on getSaleList ' + error);
      this.utilsservice.notifyError(this.$translate.instant('SALE_LIST_FAILED'));
      return false;
    });
  }

  getSaleDetail(id) {
    return this.$http({
      method: 'GET',
      url: `/v1/inventory/transactions/${id}/`
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('XHR failed on getSaleDetail ' + error);
      this.utilsservice.notifyError(this.$translate.instant('SALE_DETAIL_FAILED'));
      return false;
    });
  }

  createSale(data) {
    data.type = 'sale';
    return this.$http({
      method: 'POST',
      data: data,
      url: '/v1/inventory/transactions/'
    })
    .then((response) => {
      this.utilsservice.notifySuccess(this.$translate.instant('SALE_CREATE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on createSale ' + error);
      this.utilsservice.notifyError(this.$translate.instant('SALE_CREATE_FAILED'));
      if(error.data.transactions) {
        for(const data of error.data.transactions) {
          if(data) {
            this.utilsservice.notifyError(data[0]);
          }
        }
      }
      return false;
    });
  }
}
