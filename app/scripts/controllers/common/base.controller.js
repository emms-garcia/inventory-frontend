export default class BaseController {
  constructor($state, $translate, userservice, utilsservice) {
    this.$state = $state;
    this.$translate = $translate;
    this.userservice = userservice;
    this.utilsservice = utilsservice;

    this.currentUser = this.userservice.currentUser;

    this.activate();

    this.$inject = ['$state', '$translate', 'userservice', 'utilsservice'];
  }

  logOut() {
    const config = {
      bodyMsg: this.$translate.instant('LOGOUT_MODAL_BODY'),
      titleMsg: this.$translate.instant('LOGOUT_MODAL_TITLE'),
    };
    this.utilsservice.confirmationDialog(() => {
      this.userservice.logOut().then((loggedOut) => {
        if(loggedOut) {
          this.$state.go('login');
        }
      });
    }, null, config);
  }

  activate() {
    console.log('BaseController activated.');
  }
}
