class TransactionHistoryController {
  constructor() {
    this.showDetails = false;

    this.activate();
    this.$inject = [];
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  activate() {
    console.log('TransactionHistoryController activated.');
  }
}


export default function transactionHistory() {
  return {
    controller: TransactionHistoryController,
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'E',
    scope: {
      transaction: '='
    },
    templateUrl: 'assets/views/transactions/directives/transaction-history.html'
  };
}
