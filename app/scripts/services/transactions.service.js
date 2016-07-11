export default class transactionsservice {
  constructor($http, $translate, utilsservice) {
    this.$http = $http;
    this.$translate = $translate;
    this.utilsservice = utilsservice;

    this.$inject = ['$http', '$translate', 'utilsservice'];
  }

  createTransaction(data) {
    return this.$http({
      method: 'POST',
      data: data,
      url: '/v1/inventory/transactions/'
    })
    .then((response) => {
      this.utilsservice.notifySuccess(this.$translate.instant('TRANSACTION_CREATE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on createSale ' + error);
      this.utilsservice.notifyError(this.$translate.instant('TRANSACTION_CREATE_FAILED'));
      this.utilsservice.notifyError(error.data.error);
      return false;
    });
  }

  deleteTransaction(id) {
    return this.$http({
      method: 'DELETE',
      url: `/v1/inventory/transactions/${id}/`
    })
    .then((response) => {
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on deleteTransaction ' + error);
      this.utilsservice.notifyError(this.$translate.instant('TRANSACTION_DELETE_FAILED'));
      return false;
    });
  }

  getTransactionDetail(id) {
    return this.$http({
      method: 'GET',
      url: `/v1/inventory/transactions/${id}/`
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('XHR failed on getSaleDetail ' + error);
      this.utilsservice.notifyError(this.$translate.instant('TRANSACTION_DETAIL_FAILED'));
      return false;
    });
  }

  getTransactionList(type) {
    return this.$http({
      method: 'GET',
      url: '/v1/inventory/transactions/'
    })
    .then((response) => {
      return response.data.objects;
    })
    .catch((error) => {
      console.log('XHR failed on getSaleList ' + error);
      this.utilsservice.notifyError(this.$translate.instant('TRANSACTION_LIST_FAILED'));
      return false;
    });
  }
}
