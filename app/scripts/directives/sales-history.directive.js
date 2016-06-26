class SalesHistoryController {
  constructor() {
    this.showDetails = false;

    this.activate();
    this.$inject = [];
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  activate() {
    console.log('SalesHistoryController activated.');
  }
}


export default function salesHistory() {
  return {
    controller: SalesHistoryController,
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'E',
    scope: {
      sale: '='
    },
    templateUrl: 'views/sales/directives/sales-history.html'
  };
}
