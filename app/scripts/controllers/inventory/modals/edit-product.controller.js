export default class EditProductModalController {
  constructor($uibModalInstance, product, productservice) {
    this.$uibModalInstance = $uibModalInstance;
    this.productservice = productservice;

    this.product = product;
    this.stocks = [];
    this.total = 0;

    this.activate();

    this.$inject = ['$uibModalInstance', 'product', 'productservice'];
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  updateProductData(key, value) {
    return this.productservice.updateProductData(this.product.id, { [key]: value});
  }

  activate() {
    console.log('EditProductModalController activated.');
    this.productservice.getWarehouseProductStock(this.product.id).then((data) => {
      this.stocks = data;
      this.total = 0.0;
      this.stocks.forEach((stock) => {
        this.total += stock.product.quantity;
      });
    });
  }
}
