export default class EditPasswordModalController {
  constructor($translate, $uibModalInstance, user, userservice, utilsservice) {
    this.$translate = $translate;
    this.$uibModalInstance = $uibModalInstance;
    this.user = user;
    this.userservice = userservice;
    this.utilsservice = utilsservice;

    this.password1 = null;
    this.password2 = null;

    this.activate();

    this.$inject = ['$translate', '$uibModalInstance', 'user', 'userservice', 'utilsservice'];
  }

  confirm() {
    if(this.password1 && (this.password1 === this.password2)) {
      this.userservice.updateUserData(this.user.id, {
        password: this.password1
      }).then((data) => {
        if(data) {
          this.$uibModalInstance.close();
        }
      });
    } else {
      if(!this.password1 && !this.password2) {
        this.utilsservice.notifyError(this.$translate.instant('EMPTY_PASSWORDS'));
      } else {
        this.utilsservice.notifyError(this.$translate.instant('PASSWORDS_DONT_MATCH'));
      }
    }
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  activate() {
    console.log('EditPasswordModalController activated.');
  }
}
