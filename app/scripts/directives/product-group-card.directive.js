export default function productGroupCard() {
  return {
    controller: 'ProductGroupCardController',
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'E',
    scope: {
      group: '='
    },
    templateUrl: 'views/inventory/directives/product-group-card.html'
  };
}
