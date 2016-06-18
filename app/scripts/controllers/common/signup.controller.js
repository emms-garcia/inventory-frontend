export default class SignUpController {
  constructor($state, $translate, userservice) {
    this.$state = $state;
    this.$translate = $translate;
    this.userservice = userservice;

    this.company = null;
    this.firstName = null;
    this.lastName = null;
    this.password1 = null;
    this.password2 = null;
    this.username = null;

    this.activate();

    this.$inject = ['$state', '$translate', 'userservice'];
  }

  create() {
    this.userservice.createUser({
      company: this.company,
      first_name: this.firstName,
      last_name: this.lastName,
      password: this.password1,
      username: this.username
    }).then((success) => {
      if(success) {
        this.$state.go('login');
      }
    });
  }

  passwordsMatch() {
    return this.password1 && this.password2 && this.password1 === this.password2;
  }

  activate() {
    console.log('SignUpController activated');
  }
}
