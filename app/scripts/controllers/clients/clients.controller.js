export default class ClientsController {
  constructor($uibModal, clientsservice, userservice, utilsservice) {
    this.$uibModal = $uibModal;
    this.clientsservice = clientsservice;
    this.userservice = userservice;
    this.utilsservice = utilsservice;

    this.clients = [];
    this.currentUser = userservice.currentUser;

    this.activate();

    this.$inject = ['$uibModal', 'clientsservice', 'userservice', 'utilsservice'];
  }

  deleteClient(id) {
    this.utilsservice.confirmationDialog(() => {
      this.clientsservice.deleteClient(id).then((data) => {
        if (data) {
          this.clientsservice.getClientList().then((data) => {
            this.clients = data;
          });
        }
      });
    }, null, {
      bodyMsg: this.utilsservice.translate('DELETE_CLIENT_CONFIRM_BODY'),
      titleMsg: this.utilsservice.translate('DELETE_CLIENT_CONFIRM_TITLE'),
    });
  }

  openCreateClientModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'views/clients/modals/create-client.html',
      controller: 'CreateClientModalController as vm',
      size: 'lg'
    });
    modalInstance.result.then(() => {
      this.clientsservice.getClientList().then((data) => {
        this.clients = data;
      });
    });
  }

  activate() {
    console.log('ClientsController activated.');
    this.clientsservice.getClientList().then((data) => {
      this.clients = data;
    });
  }
}
