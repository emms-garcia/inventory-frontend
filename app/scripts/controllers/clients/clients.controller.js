export default class ClientsController {
  constructor($filter, $translate, $uibModal, clientsservice, utilsservice) {
    this.$translate = $translate;
    this.$uibModal = $uibModal;
    this.clientsservice = clientsservice;
    this.utilsservice = utilsservice;

    this.clients = {
      actions: [{
        callback: (client) => {
          this.deleteClients([client]);
        },
        name: $translate.instant('DELETE_CLIENT'),
      }],
      bulkActions: [{
        callback: (clients) => {
          this.deleteClients(clients);
        },
        name: $translate.instant('DELETE_SELECTED_CLIENTS'),
      }],
      columns: [
        {
          name: $translate.instant('ID'),
          property: 'id',
        },
        {
          format: (client) => {
            return $filter('date')(client.created_at * 1000, 'dd/MMM/yyyy hh:mm a');
          },
          name: $translate.instant('CREATED_AT'),
          property: 'created_at',
        },
        {
          edit: (client, key, value) => {
            return this.updateClientData(client, key, value);
          },
          name: $translate.instant('NAME'),
          property: 'name',
        },
        {
          edit: (client, key, value) => {
            return this.updateClientData(client, key, value);
          },
          name: $translate.instant('EMAIL'),
          property: 'email',
          type: 'email',
        },
        {
          edit: (client, key, value) => {
            return this.updateClientData(client, key, value);
          },
          name: $translate.instant('COMPANY'),
          property: 'company',
        },
        {
          edit: (client, key, value) => {
            return this.updateClientData(client, key, value);
          },
          name: $translate.instant('RFC'),
          property: 'rfc',
        },
        {
          edit: (client, key, value) => {
            return this.updateClientData(client, key, value);
          },
          name: $translate.instant('PHONE'),
          property: 'phone',
        },
        {
          edit: (client, key, value) => {
            return this.updateClientData(client, key, value);
          },
          name: $translate.instant('CELLPHONE'),
          property: 'cellphone',
        },
        {
          edit: (client, key, value) => {
            return this.updateClientData(client, key, value);
          },
          name: $translate.instant('ADDRESS'),
          property: 'address',
          type: 'textarea',
        },
      ],
      data: [],
      meta: {},
      requestMore: (next) => {
        this.getClients(next);
      },
    };

    this.activate();

    this.$inject = ['$filter', '$translate', '$uibModal', 'clientsservice', 'utilsservice'];
  }

  openCreateClientModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'assets/views/clients/modals/create-client.html',
      controller: 'CreateClientModalController as vm',
      size: 'md'
    });
    modalInstance.result.then(() => {
      this.getClients();
    });
  }

  deleteClients(clients) {
    const data = clients.map((uom) => {
      return clients.resource_uri;
    });

    if(data.length > 0) {
      const config = {
        bodyMsg: this.$translate.instant('DELETE_CLIENTS_MODAL_BODY'),
        titleMsg: this.$translate.instant('DELETE_CLIENTS_MODAL_TITLE')
      };
      this.utilsservice.confirmationDialog(() => {
        this.clientsservice.deleteClients(data).then(() => {
          this.getClients();
        });
      }, null, config);
    }
  }

  getClients(next) {
    this.clientsservice.getClientList(next).then((data) => {
      if(data) {
        if(next) {
          this.clients.data = this.clients.data.concat(data.objects);
        } else {
          this.clients.data = data.objects;
        }
        this.clients.meta = data.meta;
      }
    });
  }

  updateClientData(client, key, value) {
    return this.clientsservice.updateClientData(client.id, {[key]: value});
  }

  activate() {
    console.log('ClientsController activated.');
    this.getClients();
  }
}
