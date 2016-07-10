class TransactionDetailController {
  constructor($translate, $uibModal, userservice) {
    this.$translate = $translate;
    this.$uibModal = $uibModal;

    this.currentUser = userservice.currentUser;

    this.activate();

    this.$inject = ['$translate', '$uibModal', 'userservice'];
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
