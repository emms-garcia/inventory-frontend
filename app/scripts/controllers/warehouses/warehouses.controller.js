export default class WarehousesController {
  constructor(warehousesservice) {
    this.warehousesservice = warehousesservice;

    this.queryWarehouses = '';
    this.warehouses = [];

    this.activate();

    this.$inject = ['warehousesservice'];
  }

  getWarehouses () {
    this.warehousesservice.getWarehouseList().then((data) => {
      this.warehouses = data;
    });
  }

  activate() {
    console.log('WarehousesController activated.');
    this.getWarehouses();
  }
}
