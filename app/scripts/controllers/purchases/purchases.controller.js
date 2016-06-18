export default class PurchasesController {
  constructor(userservice) {
    this.currentUser = userservice.currentUser;

    this.activate();

    this.$inject = ['userservice'];
  }

  activate() {
    console.log('PurchasesController activated.');
  }
}
