export default class SalesController {
  constructor($translate, $uibModal, clientsservice, salesservice, utilsservice) {
    this.$translate = $translate;
    this.$uibModal = $uibModal;
    this.clientsservice = clientsservice;
    this.salesservice = salesservice;
    this.utilsservice = utilsservice;

    this.activate();
    this.$inject = ['$translate', '$uibModal', 'clientsservice', 'salesservice', 'utilsservice'];
  }

  calculateTotal() {
    let total = 0.0;
    this.saleProducts.forEach((product) => {
      total += (product.salePrice * product.saleQuantity);
    });
    return total;
  }

  confirmSale() {
    if(this.saleProducts.length === 0) {
      this.utilsservice.notifyError(this.$translate.instant('NO_PRODUCTS_SALE'));
      return;
    }

    const products = [];
    for(const product of this.saleProducts){
      products.push({
        id: product.id,
        name: product.name,
        quantity: product.saleQuantity,
        price: product.salePrice,
        priceChanged: (product.salePrice === product.price_per_unit),
        total: (product.saleQuantity * product.salePrice)
      });
    }
    const data = {
      client_id: this.saleClient,
      description: this.saleDescription,
      name: this.saleName,
      voucher: {
        cart: products,
        total: this.calculateTotal()
      }
    };
    this.utilsservice.confirmationDialog(() => {
      this.salesservice.createSale(data).then((success) => {
        if(success) {
          this.resetCart();
        }
      });
    });
  }

  openAddProductModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'views/sales/modals/add-product.html',
      controller: 'AddProductModalController as vm',
      size: 'md'
    });

    modalInstance.result.then((data) => {
      data.salePrice = data.price_per_unit;
      data.saleQuantity = 0;
      this.saleProducts.push(data);
    });
  }

  resetCart() {
    this.activate();
  }

  activate() {
    console.log('SalesController activated.');
    this.clientsToSale = [];
    this.saleClient = null;
    this.saleDescription = '';
    this.saleName = '';
    this.saleProducts = [];
    this.salesHistory = [];

    this.salesservice.getSaleList().then((data) => {
      this.salesHistory = data;
    });

    this.clientsservice.getClientList().then((data) => {
      this.clientsToSale = data;
    });
  }
}
