export default class SidebarController {
  constructor($state, userservice, utilsservice) {
    this.$state = $state;
    this.userservice = userservice;
    this.utilsservice = utilsservice;

    this.currentUser = userservice.currentUser;

    this.activate();

    this.$inject = ['$state', 'userservice', 'utilsservice'];
  }

  logOut() {
    this.utilsservice.confirmationDialog(() => {
      this.userservice.logOut().then((loggedOut) => {
        if(loggedOut) {
          this.$state.go('login');
        }
      });
    });
  }

  activate() {
    console.log('SidebarController activated.');
  }
}
