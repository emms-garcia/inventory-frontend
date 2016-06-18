export default class SettingsController {
  constructor(userservice) {
    this.currentUser = userservice.currentUser;

    this.activate();

    this.$inject = ['userservice'];
  }

  activate() {
    console.log('Activate SettingsController');
  }
}
