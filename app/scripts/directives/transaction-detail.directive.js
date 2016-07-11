import BigNumber from 'bignumber.js';

class TransactionDetailController {
  constructor($translate, $uibModal, userservice) {
    this.$translate = $translate;
    this.$uibModal = $uibModal;

    this.currentUser = userservice.currentUser;

    this.activate();

    this.$inject = ['$translate', '$uibModal', 'userservice'];
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
          this.getTransactions();
        });
      });
    }
  }

  activate() {
    console.log('TransactionDetailController activated.');
  }
}

export default function transactionDetail() {
  return {
    controller: TransactionDetailController,
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'E',
    scope: {
      transaction: '='
    },
    templateUrl: 'assets/views/transactions/directives/transaction-detail.html'
  };
}
