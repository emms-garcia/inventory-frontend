export default class CreateWarehouseModalController {
  constructor($uibModalInstance, warehousesservice) {
    this.$uibModalInstance = $uibModalInstance;
    this.warehousesservice = warehousesservice;

    this.description = null;
    this.name = null;

    this.activate();

    this.$inject = ['$uibModalInstance', 'warehousesservice'];
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  create() {
    this.warehousesservice.createWarehouse({
      description: this.description,
      name: this.name
    }).then((data) => {
      if(data) {
        this.$uibModalInstance.close(data);
      }
    });
  }

  activate() {
    console.log('CreateWarehouseModalController activated.');
  }
}
