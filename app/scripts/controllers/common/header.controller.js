export default class HeaderController {
  constructor(userservice) {
    this.currentUser = userservice.currentUser;

    this.activate();

    this.$inject = ['$state', 'userservice'];
  }

  activate() {
    console.log('HeaderController activated.');
  }
}
