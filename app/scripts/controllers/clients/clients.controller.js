export default class ClientsController {
  constructor($translate, $uibModal, clientsservice, utilsservice) {
    this.$translate = $translate;
    this.$uibModal = $uibModal;
    this.clientsservice = clientsservice;
    this.utilsservice = utilsservice;

    this.allClientsSelected = false;
    this.clients = [];
    this.queryClients = '';

    this.activate();

    this.$inject = ['$translate', '$uibModal', 'clientsservice', 'utilsservice'];
  }

  openCreateClientModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'assets/views/clients/modals/create-client.html',
      controller: 'CreateClientModalController as vm',
      size: 'lg'
    });
    modalInstance.result.then(() => {
      this.clientsservice.getClientList().then((data) => {
        this.clients = data;
      });
    });
  }

  deleteSelectedClients() {
    const data = [];
    this.clients.forEach((client) => {
      if(client.selected) {
        data.push(client.resource_uri);
      }
    })

    if(data.length > 0) {
      const config = {
        bodyMsg: this.$translate.instant('DELETE_PRODUCTS_MODAL_BODY'),
        titleMsg: this.$translate.instant('DELETE_PRODUCTS_MODAL_TITLE')
      };
      this.utilsservice.confirmationDialog(() => {
        this.clientsservice.deleteClients(data).then(() => {
          this.getClients();
        });
      }, null, config);
    }
  }

  toggleAllClients() {
    this.clients.forEach((client) => {
      client.selected = this.allClientsSelected;
    });
  }

  getClients() {
    this.clientsservice.getClientList().then((data) => {
      this.clients = data;
    });
  }

  activate() {
    console.log('ClientsController activated.');
    this.getClients();
  }
}
