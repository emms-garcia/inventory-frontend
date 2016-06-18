export default class SalesController {
  constructor(userservice) {
    this.currentUser = userservice.currentUser;

    this.activate();

    this.$inject = ['userservice'];
  }

  activate() {
    console.log('SalesController activated.');
  }
}
