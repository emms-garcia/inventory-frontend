export default class CreateUserModalController {
  constructor($translate, $uibModalInstance, userservice) {
    this.$translate = $translate;
    this.$uibModalInstance = $uibModalInstance;
    this.userservice = userservice;

    this.firstName = null;
    this.lastName = null;
    this.password1 = null;
    this.password2 = null;
    this.username = null;

    this.activate();

    this.$inject = ['$translate', '$uibModalInstance', 'userservice'];
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  create() {
    this.userservice.createUser({
      first_name: this.firstName,
      last_name: this.lastName,
      password: this.password1,
      username: this.username
    }).then((data) => {
      if (data) {
        this.$uibModalInstance.close(data);
      }
    });
  }

  passwordsMatch() {
    return this.password1 && this.password2 && this.password1 === this.password2;
  }

  activate() {
    console.log('CreateUserModalController activated.');
  }
}
