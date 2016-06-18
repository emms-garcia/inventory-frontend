export default class DashboardController {
  constructor(userservice) {
    this.currentUser = userservice.currentUser;

    this.activate();

    this.$inject = ['userservice'];
  }

  activate() {
    console.log('DashboardController activated.');
  }
}
