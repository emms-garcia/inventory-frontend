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


export default function salesHistory() {
  return {
    controller: TransactionHistoryController,
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'E',
    scope: {
      transaction: '='
    },
    templateUrl: 'views/transactions/directives/transaction-history.html'
  };
}
