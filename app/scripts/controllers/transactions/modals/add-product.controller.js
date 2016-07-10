export default class AddProductModalController {
  constructor($uibModalInstance, productservice) {
    this.$uibModalInstance = $uibModalInstance;
    this.productservice = productservice;

    this.products = [];
    this.selectedProduct = null;

    this.activate();

    this.$inject = ['$uibModalInstance', 'productservice'];
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  add() {
    this.$uibModalInstance.close(this.selectedProduct);
  }

  activate() {
    console.log('AddProductModalController activated.');
    this.productservice.getProductList().then((data) => {
      if(data) {
        this.products = data.objects;
      }
    });
  }
}
