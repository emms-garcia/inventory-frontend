import BigNumber from 'bignumber.js';

class TransactionWizardController {
  constructor($state, $translate, $uibModal, clientsservice, productservice, transactionsservice, utilsservice) {
    this.$state = $state;
    this.$translate = $translate;
    this.$uibModal = $uibModal;
    this.clientsservice = clientsservice;
    this.productservice = productservice;
    this.transactionsservice = transactionsservice;
    this.utilsservice = utilsservice;

    this.activate();

    this.clients = [];
    this.currentTab = 0;
    this.tabs = [
      $translate.instant('TRANSACTION_INFORMATION'),
      $translate.instant('TRANSACTION_CART'),
      $translate.instant('TRANSACTION_BILLING'),
      $translate.instant('TRANSACTION_PREVIEW'),
    ];

    this.selectedClient = null;
    this.taxes = [];
    this.transaction = {
      client: {},
      description: null,
      date: new Date(),
      location: null,
      name: null,
      time: new Date(),
      type: this.type || 'sale',
      voucher: {
        products: [],
        subtotal: 0.0,
        taxes: [],
        total: 0.0,
      }
    };

    this.$inject = ['$state', '$translate', '$uibModal', 'clientsservice', 'productservice', 'transactionsservice', 'utilsservice'];
  }

  calculateSubTotal() {
    let subTotal = new BigNumber(0.0);
    for(const product of this.transaction.voucher.products) {
      const a = new BigNumber(product.transactionPrice);
      const b = new BigNumber(product.transactionQuantity);
      subTotal = subTotal.plus(a.times(b));
    }
    return subTotal.toNumber();
  }

  calculateTax() {
    const subTotal = new BigNumber(this.calculateSubTotal());
    let taxSum = new BigNumber(0.0);
    for(const tax of this.taxes) {
      if(tax.selected) {
        taxSum = taxSum.plus(subTotal.times(new BigNumber(tax.percent)));
      }
    }
    return taxSum.toNumber();
  }

  calculateTotal() {
    const subtotal = new BigNumber(this.calculateSubTotal());
    const total = subtotal.plus(new BigNumber(this.calculateTax()));
    this.transaction.voucher.subtotal = subtotal.toNumber();
    this.transaction.voucher.total = total.toNumber();
    return total.toNumber();
  }

  confirmTransaction() {
    const transaction = Object.assign({}, this.transaction);
    if(transaction.voucher.products.length === 0) {
      this.utilsservice.notifyError(this.$translate.instant('NO_PRODUCTS_ON_TRANSACTION'));
      return;
    }

    const products = transaction.voucher.products.map((product) => {
      const a = new BigNumber(product.transactionQuantity);
      const b = new BigNumber(product.transactionPrice);
      return {
        id: product.id,
        name: product.name,
        quantity: product.transactionQuantity,
        price: product.transactionPrice,
        real_price: product.price_per_unit,
        real_quantity: product.quantity,
        total: a.times(b),
      };
    });

    transaction.products = products;
    this.utilsservice.confirmationDialog(() => {
      this.transactionsservice.createTransaction(transaction).then((success) => {
        if(success) {
          this.$state.go('transactions');
        }
      });
    });
  }

  nextTab() {
    this.currentTab += 1;
    if (this.currentTab > 3) {
      this.currentTab = 3;
    }
  }

  onClientSelected() {
    if(this.selectedClient) {
      this.transaction.client = {
        id: this.selectedClient.id,
        name: this.selectedClient.name,
        company: this.selectedClient.company,
        email: this.selectedClient.email,
        rfc: this.selectedClient.rfc,
        phone: this.selectedClient.phone,
        cellphone: this.selectedClient.cellphone,
        address: this.selectedClient.address,
        comment: this.selectedClient.comment,
      };
    } else {
      delete this.transaction.client.client_id;
    }
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
      data.transactionQuantity = 0.0;
      this.transaction.voucher.products.push(data);
    });
  }

  previousTab() {
    this.currentTab -= 1;
    if (this.currentTab < 0) {
      this.currentTab = 0;
    }
  }

  removeProduct(index) {
    this.transaction.voucher.products.splice(index, 1);
  }

  taxSelected() {
    this.transaction.voucher.taxes = [];
    this.taxes.forEach((tax) => {
      if(tax.selected) {
        this.transaction.voucher.taxes.push(tax);
      }
    });
  }

  activate() {
    console.log('TransactionWizardController activated.');
    this.clientsservice.getClientList().then((data) => {
      if(data) {
        this.clients = data.objects;
      }
    });
    this.productservice.getTaxList().then((data) => {
      this.taxes = data || [];
    });
  }
}

export default function transactionWizard() {
  return {
    controller: TransactionWizardController,
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'E',
    scope: {
      type: '=',
    },
    templateUrl: 'assets/views/transactions/directives/transaction-wizard.html'
  };
}
