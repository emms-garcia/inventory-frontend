export default class UsersController {
  constructor($uibModal, userservice, utilsservice) {
    this.$uibModal = $uibModal;
    this.userservice = userservice;
    this.utilsservice = utilsservice;

    this.currentUser = userservice.currentUser;
    this.selectedUser = null;
    this.userList = [];

    this.activate();

    this.$inject = ['$uibModal', 'userservice', 'utilsservice'];
  }

  changeUser(user) {
    this.selectedUser = user;
  }

  deleteUser(user) {
    this.utilsservice.confirmationDialog(() => {
      this.userservice.deleteUser(user.id).then(() => {
        this.loadUserList();
      });
    });
  }

  loadUserList(selectedUser) {
    this.userservice.getUserList().then((data) => {
      this.userList = data;
      if(selectedUser) {
        this.selectedUser = selectedUser;
      } else {
        this.selectedUser = data.length > 0 ? data[0] : null;
      }
    });
  }

  openCreateUserModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'views/users/modals/create-user.html',
      controller: 'CreateUserModalController as vm',
      size: 'md'
    });
    modalInstance.result.then((newUser) => {
      this.loadUserList(newUser);
    });
  }

  openEditPasswordModal() {
    this.$uibModal.open({
      animation: true,
      templateUrl: 'views/users/modals/edit-password.html',
      controller: 'EditPasswordModalController as vm',
      size: 'md',
      resolve: {
        user: () => {
          return this.selectedUser;
        }
      }
    });
  }

  updateUserData(key, value) {
    return this.userservice.updateUserData(this.selectedUser.id, { [key]: value });
  }

  activate() {
    console.log('UsersController activated.');
    this.loadUserList();
  }
}
