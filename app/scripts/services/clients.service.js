export default class clientsservice {
  constructor($http, $translate, utilsservice) {
    this.$http = $http;
    this.$translate = $translate;
    this.utilsservice = utilsservice;

    this.$inject = ['$http', '$translate', 'utilsservice'];
  }

  getClientList(url='/v1/inventory/clients/') {
    return this.$http({
      method: 'GET',
      url: url
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('XHR failed on getClientList ' + error);
      this.utilsservice.notifyError(this.$translate.instant('CLIENT_LIST_FAILED'));
      return false;
    });
  }

  getClientDetail(id) {
    return this.$http({
      method: 'GET',
      url: `/v1/inventory/clients/${id}/`
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('XHR failed on getClientDetail ' + error);
      this.utilsservice.notifyError(this.$translate.instant('CLIENT_DETAIL_FAILED'));
      return false;
    });
  }

  updateClientData(id, data) {
    return this.$http({
      method: 'PATCH',
      data: data,
      url: '/v1/inventory/clients/' + id + '/'
    })
    .then((response) => {
      this.utilsservice.notifySuccess(this.$translate.instant('CLIENT_UPDATE_SUCCESS'));
      return response.data;
    })
    .catch((error) => {
      console.log('XHR failed on updateClientData ' + error);
      this.utilsservice.notifyError(this.$translate.instant('CLIENT_UPDATE_FAILED'));
      if(error.data.clients) {
        for(const data of error.data.clients) {
          if(data) {
            this.utilsservice.notifyError(data[0]);
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
      url: '/v1/inventory/clients/'
    })
    .then((response) => {
      this.utilsservice.notifySuccess(this.$translate.instant('CLIENT_CREATE_SUCCESS'));
      return response.data;
    })
    .catch((error) => {
      console.log('XHR failed on createClient ' + error);
      this.utilsservice.notifyError(this.$translate.instant('CLIENT_CREATE_FAILED'));
      if(error.data.clients) {
        for(const data of error.data.clients) {
          if(data) {
            this.utilsservice.notifyError(data[0]);
          }
        }
      }
      return false;
    });
  }

  deleteClient(id) {
    return this.$http({
      method: 'DELETE',
      url: `/v1/inventory/clients/${id}/`
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('CLIENT_DELETE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on deleteClient ' + error);
      this.utilsservice.notifyError(this.$translate.instant('CLIENT_DELETE_FAILED'));
      return false;
    });
  }

  deleteClients(objects) {
    return this.$http({
      data: {
        deleted_objects: objects,
        objects: []
      },
      method: 'PATCH',
      url: '/v1/inventory/clients/'
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('CLIENTS_DELETE_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR failed on deleteClients ' + error);
      if(error.status === 400) {
        this.utilsservice.notifyError(error.data.error);
      } else {
        this.utilsservice.notifyError(this.$translate.instant('CLIENTS_DELETE_FAILED'));
      }
      return false;
    });
  }

}
