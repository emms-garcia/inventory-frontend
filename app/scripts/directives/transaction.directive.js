import BigNumber from 'bignumber.js';

class TransactionController {
  constructor($state, $translate, $uibModal, transactionsservice, userservice, utilsservice) {
    this.$state = $state;
    this.$translate = $translate;
    this.$uibModal = $uibModal;
    this.transactionsservice = transactionsservice;
    this.utilsservice = utilsservice;

    this.currentUser = userservice.currentUser;

    this.activate();

    this.$inject = ['$state', '$translate', '$uibModal', 'transactionsservice', 'userservice', 'utilsservice'];
  }

  calculateAmount(product) {
    const a = new BigNumber(product.transactionQuantity);
    const b = new BigNumber(product.transactionPrice);
    return a.times(b).toNumber();
  }

  calculateTax(tax) {
    const a = new BigNumber(tax.percent);
    const b = new BigNumber(this.transaction.voucher.subtotal);
    return a.times(b).toNumber();
  }

  deleteTransaction() {
    if(this.transaction.id) {
      this.utilsservice.confirmationDialog(() => {
        this.transactionsservice.deleteTransaction(this.transaction.id).then(() => {
          this.$state.go('transactions-history');
        });
      });
    }
  }

  activate() {
    console.log('TransactionController activated.');
  }
}

export default function transactionDetail() {
  return {
    controller: TransactionController,
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'E',
    scope: {
      transaction: '='
    },
    templateUrl: 'assets/views/transactions/directives/transaction.html'
  };
}
