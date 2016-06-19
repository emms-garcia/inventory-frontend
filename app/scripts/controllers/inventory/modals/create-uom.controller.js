export default class CreateUOMModalController {
  constructor($uibModalInstance, productservice) {
    this.$uibModalInstance = $uibModalInstance;
    this.productservice = productservice;

    this.description = null;
    this.name = null;
    this.short_name = null;

    this.activate();

    this.$inject = ['$uibModalInstance', 'productservice'];
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  create() {
    this.productservice.createUOM({
      description: this.description,
      name: this.name,
      short_name: this.short_name
    }).then((data) => {
      if(data) {
        this.$uibModalInstance.close(data);
      }
    });
  }

  activate() {
    console.log('CreateUOMModalController activated.');
  }
}
