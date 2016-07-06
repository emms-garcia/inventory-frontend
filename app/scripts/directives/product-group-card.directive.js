class ProductGroupCardController {
  constructor() {
    this.activate();

    this.showDetails = false;

    this.$inject = [];
  }

  toggleShowDetails() {
    this.showDetails = !this.showDetails;
  }

  activate() {
    console.log('ProductGroupCardController activated.');
  }
}

export default function productGroupCard() {
  return {
    controller: ProductGroupCardController,
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'E',
    scope: {
      group: '='
    },
    templateUrl: 'assets/views/inventory/directives/product-group-card.html'
  };
}
