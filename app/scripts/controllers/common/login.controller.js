export default class LoginController {
  constructor($state, userservice) {
    this.$state = $state;
    this.userservice = userservice;

    this.password = null;
    this.username = null;

    this.activate();

    this.$inject = ['$state', 'userservice'];
  }

  logIn() {
    if(this.username) {
      this.userservice.logIn(this.username, this.password).then((loggedIn) => {
        if(loggedIn) {
          this.$state.go('dashboard');
        }
      });
    }
  }

  activate() {
    console.log('Login Controller activated.');
  }
}
