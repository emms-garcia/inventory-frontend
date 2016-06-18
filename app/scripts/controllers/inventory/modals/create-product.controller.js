export default class CreateProductModalController {
  constructor($uibModalInstance, productservice) {
    this.$uibModalInstance = $uibModalInstance;
    this.productservice = productservice;

    this.description = null;
    this.name = null;
    this.pricePerUnit = 0.0;

    this.activate();

    this.$inject = ['$uibModalInstance', 'productservice'];
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  create() {
    this.productservice.createProduct({
      description: this.description,
      name: this.name,
      price: this.pricePerUnit
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
