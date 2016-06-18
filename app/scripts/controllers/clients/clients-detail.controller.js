export default class ClientsDetailController {
  constructor($state, $stateParams, clientsservice, utilsservice) {
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.clientsservice = clientsservice;
    this.utilsservice = utilsservice;

    this.currentClient = null;

    this.activate();

    this.$inject = [
      '$state',
      '$stateParams',
      'clientsservice',
      'utilsservice'
    ];
  }

  deleteClient() {
    this.utilsservice.confirmationDialog(() => {
      this.clientsservice.deleteClient(this.currentClient.id).then((data) => {
        if (data) {
          this.$state.go('clients');
        }
      });
    });
  }

  updateClientData(key, value) {
    return this.clientsservice.updateClientData(this.currentClient.id, {[key]: value});
  }

  updateGeolocation() {
    return this.clientsservice.updateClientData(this.currentClient.id, {}).then((data) => {
      if (data) {
        this.currentClient.latitude = data.latitude;
        this.currentClient.longitude = data.longitude;
      }
    });
  }

  activate() {
    console.log('ClientsDetailController activated.');
    if (this.$stateParams.clientId) {
      this.clientsservice.getClientDetail(this.$stateParams.clientId).then((data) => {
        if (data) {
          this.currentClient = data;
        } else {
          this.$state.go('clients');
        }
      });
    } else {
      this.$state.go('clients');
    }
  }
}
