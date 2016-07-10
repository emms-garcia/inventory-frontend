class TransactionWizardController {
  constructor($translate, $uibModal, clientsservice) {
    this.$uibModal = $uibModal;
    this.clientsservice = clientsservice;

    this.activate();

    this.clients = [];
    this.currentTab = 0;
    this.tabs = [
      $translate.instant('TRANSACTION_INFORMATION'),
      $translate.instant('TRANSACTION_CART'),
      $translate.instant('TRANSACTION_BILLING'),
      $translate.instant('TRANSACTION_PREVIEW'),
    ];

    this.transaction = {
      billing: {},
      comment: '',
      name: '',
      type: this.type || 'sale',
      voucher: {
        products: [],
        taxes: [{
          name: 'IVA 16%',
          percent: 0.16,
        }],
      },
    };

    this.$inject = ['$translate', '$uibModal', 'clientsservice'];
  }

  calculateSubTotal() {
    let subTotal = 0.0;
    for(const product of this.transaction.voucher.products) {
      subTotal += (product.transactionPrice * product.transactionQuantity);
    }
    return subTotal;
  }

  calculateTax() {
    const subTotal = this.calculateSubTotal();
    let taxSum = 0.0;
    for(const tax of this.transaction.voucher.taxes) {
      taxSum += subTotal * tax.percent;
    }
    return taxSum;
  }

  calculateTotal() {
    const subTotal = this.calculateSubTotal();
    return subTotal + this.calculateTax();
  }

  nextTab() {
    this.currentTab += 1;
    if (this.currentTab > 3) {
      this.currentTab = 3;
    }
  }

  onClientSelected() {
    const client = this.transaction.billing.client;
    this.transaction.billing = {
      name: client.name,
      company: client.company,
      email: client.email,
      rfc: client.rfc,
      phone: client.phone,
      cellphone: client.cellphone,
      address: client.address,
      comment: client.comment,
    };
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
      this.transaction.voucher.products.push(data);
    });
  }

  removeProduct(index) {
    this.transaction.voucher.products.splice(index, 1);
  }

  previousTab() {
    this.currentTab -= 1;
    if (this.currentTab < 0) {
      this.currentTab = 0;
    }
  }

  activate() {
    console.log('TransactionWizardController activated.');
    this.clientsservice.getClientList().then((data) => {
      if(data) {
        this.clients = data.objects;
      }
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
      type: '='
    },
    templateUrl: 'assets/views/transactions/directives/transaction-wizard.html'
  };
}
