export default class CreateProductGroupModalController {
  constructor($uibModalInstance, products, productservice) {
    this.$uibModalInstance = $uibModalInstance;
    this.productservice = productservice;

    this.description = null;
    this.name = null;
    this.productPriceSum = 0.0;
    this.products = products;
    this.productsInUse = false;

    this.activate();

    this.$inject = ['$uibModalInstance', 'products', 'productservice'];
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  create() {
    const products = [];
    this.products.forEach(function (product) {
      if(product.use) {
        products.push({
          quantity: product.quantity_in_group,
          resource_uri: product.resource_uri
        });
      }
    });

    this.productservice.createProductGroup({
      description: this.description,
      name: this.name,
      products: products,
    }).then((data) => {
      if(data) {
        this.$uibModalInstance.close(data);
      }
    });
  }

  updateProductsInUse() {
    this.productPriceSum = 0.0;
    this.productsInUse = false;
    this.products.forEach((product) => {
      product.quantity_in_group = product.quantity_in_group || 1;
      if(product.use) {
        this.productPriceSum += product.price * product.quantity_in_group;
        this.productsInUse = true;
      }
    });
  }

  activate() {
    console.log('CreateProductGroupModalController activated.');
    this.updateProductsInUse();
  }
}
