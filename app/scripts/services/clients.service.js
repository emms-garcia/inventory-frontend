export default class clientsservice {
  constructor($http, $translate, utilsservice) {
    this.$http = $http;
    this.$translate = $translate;
    this.utilsservice = utilsservice;

    this.$inject = ['$http', '$translate', 'utilsservice'];
  }

  getClientList() {
    return this.$http({
      method: 'GET',
      url: '/api/inventory/clients/'
    })
    .then((response) => {
      return response.data.objects;
    })
    .catch((error) => {
      console.log('XHR failed on getClientListError ' + error);
      this.utilsservice.notifyError(this.$translate.instant('CLIENT_LIST_FAILED'));
      return false;
    });
  }

  getClientDetail(id) {
    return this.$http({
      method: 'GET',
      url: '/api/inventory/clients/' + id + '/'
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('XHR failed on getClientDetailError ' + error);
      this.utilsservice.notifyError(this.$translate.instant('CLIENT_DETAIL_FAILED'));
      return false;
    });
  }

  updateClientData(id, data) {
    return this.$http({
      method: 'PATCH',
      data: data,
      url: '/api/inventory/clients/' + id + '/'
    })
    .then((response) => {
      this.utilsservice.notifySuccess(this.$translate.instant('CLIENT_UPDATE_SUCCESS'));
      return response.data;
    })
    .catch((error) => {
      console.log('XHR failed on updateClientDataError ' + error);
      this.utilsservice.notifyError(this.$translate.instant('CLIENT_UPDATE_FAILED'));
      if(error.data.clients) {
        for(const key in data) {
          if(error.data.clients[key]) {
            this.utilsservice.notifyError(error.data.clients[key][0]);
          }
        }
      }
      return false;
    });
  }

  createClient(data) {
    return this.$http({
      method: 'POST',
      data: data,
      url: '/api/inventory/clients/'
    })
    .then((response) => {
      this.utilsservice.notifySuccess(this.$translate.instant('CLIENT_CREATE_SUCCESS'));
      return response.data;
    })
    .catch((error) => {
      console.log('XHR failed on createClientError ' + error);
      this.utilsservice.notifyError(this.$translate.instant('CLIENT_CREATE_FAILED'));
      if(error.data.clients) {
        for(const key in data) {
          if(error.data.clients[key]) {
            this.utilsservice.notifyError(error.data.clients[key][0]);
          }
        }
      }
      return false;
    });
  }

  deleteClient(id) {
    return this.$http({
      method: 'DELETE',
      url: '/api/inventory/clients/' + id + '/'
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('CLIENT_DELETE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on deleteClientError ' + error);
      this.utilsservice.notifyError(this.$translate.instant('CLIENT_DELETE_FAILED'));
      return false;
    });
  }
}
