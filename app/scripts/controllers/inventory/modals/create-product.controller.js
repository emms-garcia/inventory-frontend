export default class CreateProductModalController {
  constructor($uibModalInstance, productservice, uoms) {
    this.$uibModalInstance = $uibModalInstance;
    this.productservice = productservice;

    this.description = null;
    this.name = null;
    this.pricePerUnit = 0.0;
    this.quantity = 0.0;
    this.selectedUOM = null;
    this.uoms = uoms;

    this.activate();

    this.$inject = ['$uibModalInstance', 'productservice', 'uoms'];
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  create() {
    this.productservice.createProduct({
      description: this.description,
      name: this.name,
      price_per_unit: this.pricePerUnit,
      quantity: this.quantity,
      uom: this.selectedUOM
    }).then((data) => {
      if(data) {
        this.$uibModalInstance.close(data);
      }
    });
  }

  activate() {
    console.log('CreateProductModalController activated.');
  }
}
