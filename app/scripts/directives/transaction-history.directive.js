class TransactionHistoryController {
  constructor(transactionsservice, utilsservice) {
    this.transactionsservice = transactionsservice;
    this.utilsservice = utilsservice;

    this.transactions = [];

    this.activate();

    this.$inject = ['transactionsservice', 'utilsservice'];
  }

  deleteTransaction(id) {
    this.utilsservice.confirmationDialog(() => {
      this.transactionsservice.deleteTransaction(id).then(() => {
        this.getTransactions();
      });
    });
  }

  getTransactions() {
    this.transactionsservice.getTransactionList().then((data) => {
      this.transactions = data;
    });
  }

  activate() {
    console.log('TransactionHistoryController activated.');
    this.getTransactions();
  }
}


export default function transactionHistory() {
  return {
    controller: TransactionHistoryController,
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'E',
    scope: {
      transactions: '='
    },
    templateUrl: 'assets/views/transactions/directives/transaction-history.html'
  };
}
