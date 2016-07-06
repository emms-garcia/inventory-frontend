export default class WarehousesController {
  constructor($translate, $uibModal, utilsservice, warehousesservice) {
    this.$translate = $translate;
    this.$uibModal = $uibModal;
    this.utilsservice = utilsservice;
    this.warehousesservice = warehousesservice;

    this.allWarehousesSelected = false;
    this.queryWarehouses = '';
    this.warehouses = [];

    this.activate();

    this.$inject = ['$translate', '$uibModal', 'utilsservice', 'warehousesservice'];
  }

  deleteSelectedWarehouses() {
    const data = [];
    this.warehouses.forEach((warehouse) => {
      if(warehouse.selected) {
        data.push(warehouse.resource_uri);
      }
    })

    if(data.length > 0) {
      const config = {
        bodyMsg: this.$translate.instant('DELETE_WAREHOUSES_MODAL_BODY'),
        titleMsg: this.$translate.instant('DELETE_WAREHOUSES_MODAL_TITLE')
      };
      this.utilsservice.confirmationDialog(() => {
        this.warehousesservice.deleteWarehouses(data).then(() => {
          this.getWarehouses();
        });
      }, null, config);
    }
  }

  getWarehouses () {
    this.warehousesservice.getWarehouseList().then((data) => {
      this.warehouses = data;
    });
  }

  openCreateWarehouseModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'assets/views/warehouses/modals/create-warehouse.html',
      controller: 'CreateWarehouseModalController as vm',
      size: 'md'
    });

    modalInstance.result.then(() => {
      this.getWarehouses();
    });
  }

  toggleAllWarehouses() {
    this.warehouses.forEach((warehouse) => {
      warehouse.selected = this.allWarehousesSelected;
    });
  }

  activate() {
    console.log('WarehousesController activated.');
    this.getWarehouses();
  }
}
