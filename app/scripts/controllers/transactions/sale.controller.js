export default class SaleController {
  constructor($translate, $uibModal, clientsservice, transactionsservice, utilsservice) {
    this.$translate = $translate;
    this.$uibModal = $uibModal;
    this.clientsservice = clientsservice;
    this.transactionsservice = transactionsservice;
    this.utilsservice = utilsservice;

    this.taxes = [{
      name: 'IVA 16%',
      percent: 0.16,
    }];

    this.activate();
    this.$inject = ['$translate', '$uibModal', 'clientsservice', 'transactionsservice', 'utilsservice'];
  }

  calculateSubTotal() {
    let subTotal = 0.0;
    for(const product of this.transactionProducts) {
      subTotal += (product.transactionPrice * product.transactionQuantity);
    }
    return subTotal;
  }

  calculateTotal() {
    const subTotal = this.calculateSubTotal();
    return subTotal + this.calculateTax();
  }

  confirmTransaction() {
    if(this.transactionProducts.length === 0) {
      this.utilsservice.notifyError(this.$translate.instant('NO_PRODUCTS_ON_TRANSACTION'));
      return;
    }

    const products = [];
    for(const product of this.transactionProducts){
      products.push({
        id: product.id,
        name: product.name,
        quantity: product.transactionQuantity,
        price: product.transactionPrice,
        real_price: product.price_per_unit,
        total: (product.transactionQuantity * product.transactionPrice)
      });
    }
    const data = {
      client: this.transactionClient,
      description: this.transactionDescription,
      name: this.transactionName,
      type: this.transactionType,
      voucher: {
        cart: products,
        tax: this.calculateTax(),
        sub_total: this.calculateSubTotal(),
        total: this.calculateTotal()
      }
    };

    this.utilsservice.confirmationDialog(() => {
      this.transactionsservice.createTransaction(data).then((success) => {
        if(success) {
          this.resetCart();
        }
      });
    });
  }

  calculateTax() {
    const subTotal = this.calculateSubTotal();
    let taxSum = 0.0;
    for(const tax of this.taxes) {
      taxSum += subTotal * tax.percent;
    }
    return taxSum;
  }

  deleteTransactionProduct(index) {
    this.transactionProducts.splice(index, 1);
  }

  openAddProductModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'assets/views/transactions/modals/add-product.html',
      controller: 'AddProductModalController as vm',
      size: 'md'
    });

    modalInstance.result.then((data) => {
      data.transactionPrice = data.price_per_unit;
      data.transactionQuantity = 0;
      this.transactionProducts.push(data);
    });
  }

  resetCart() {
    this.activate();
  }

  activate() {
    console.log('SaleController activated.');
    this.clients = [];
    this.transactionClient = null;
    this.transactionDescription = '';
    this.transactionName = '';
    this.transactionProducts = [];
    this.transactionType = 'sale';

    this.clientsservice.getClientList().then((data) => {
      this.clients = data;
    });
  }
}
