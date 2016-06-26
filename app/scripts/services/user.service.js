export default class userservice {
  constructor($http, $state, $translate, localStorageService, utilsservice) {
    this.$http = $http;
    this.$state = $state;
    this.$translate = $translate;
    this.localStorageService = localStorageService;
    this.utilsservice = utilsservice;

    this.CURRENT_USER = 'CURRENT_USER';
    this.currentUser = {};
    this.userList = [];

    this.$inject = [
      '$http',
      '$state',
      '$translate',
      'localStorageService',
      'utilsservice'
    ];
  }

  logIn(username, password) {
    return this.$http({
      method: 'POST',
      url: '/v1/inventory/users/login/',
      data: {
        username: username,
        password: password
      }
    })
    .then((response) => {
      this.currentUser = response.data;
      this.localStorageService.set(this.CURRENT_USER, this.currentUser.id);
      this.utilsservice.notifySuccess(this.$translate.instant('LOGIN_SUCCESS'));
      return true;
    })
    .catch((error) => {
      this.utilsservice.notifyError(this.$translate.instant('LOGIN_FAILED'));
      console.log('XHR Failed for logIn ' + error.data);
      return false;
    });
  }

  logOut() {
    return this.$http({
      method: 'POST',
      url: '/v1/inventory/users/logout/'
    })
    .then(() => {
      this.currentUser = {};
      this.localStorageService.remove(this.CURRENT_USER);
      this.utilsservice.notifyInformation(this.$translate.instant('LOGOUT_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR Failed for logOut ' + error.data);
      return false;
    });
  }

  getCurrentUser() {
    const id = this.localStorageService.get(this.CURRENT_USER);
    return this.$http({
      method: 'GET',
      url: '/v1/inventory/users/' + id + '/'
    })
    .then((response) => {
      this.currentUser = response.data;
      return response.data;
    })
    .catch((error) => {
      console.log('XHR Failed for getCurrentUser ' + error.data);
      this.localStorageService.remove(this.CURRENT_USER);
      this.$state.go('login');
      return false;
    });
  }

  getUserList() {
    return this.$http({
      method: 'GET',
      url: '/v1/inventory/users/'
    })
    .then((response) => {
      this.userList = response.data.objects;
      return response.data.objects;
    })
    .catch((error) => {
      console.log('XHR Failed for getUserList ' + error.data);
      this.utilsservice.notifyError(this.$translate.instant('GET_USER_LIST_FAILED'));
      return [this.currentUser];
    });
  }

  createUser(data) {
    return this.$http({
      method: 'POST',
      url: '/v1/inventory/users/signup/',
      data: data
    })
    .then((response) => {
      this.utilsservice.notifySuccess(this.$translate.instant('CREATE_USER_SUCCESS'));
      return response.data;
    })
    .catch((error) => {
      console.log('XHR Failed for createUserFailed ' + error.data);
      this.utilsservice.notifyError(this.$translate.instant('CREATE_USER_FAILED'));
      if(error.data.users) {
        for(const key in error.data.users) {
          if(error.data.users[key]) {
            this.utilsservice.notifyError(error.data.users[key][0]);
          }
        }
      } else if(error.data) {
        this.utilsservice.notifyError(error.data);
      }
      return false;
    });
  }

  updateUserData(id, data) {
    return this.$http({
      method: 'PATCH',
      url: '/v1/inventory/users/' + id + '/',
      data: data
    })
    .then((response) => {
      this.utilsservice.notifySuccess(this.$translate.instant('UPDATE_USER_SUCCESS'));
      return response.data;
    })
    .catch((error) => {
      console.log('XHR Failed for updateUserData ' + error.data);
      this.utilsservice.notifyError(this.$translate.instant('UPDATE_USER_FAILED'));
      if(error.data.users) {
        for(const key in error.data.users) {
          if(error.data.users[key]) {
            this.utilsservice.notifyError(error.data.users[key][0]);
          }
        }
      }
      return false;
    });
  }

  deleteUser(id) {
    return this.$http({
      method: 'DELETE',
      url: '/v1/inventory/users/' + id + '/'
    })
    .then(() => {
      this.utilsservice.notifySuccess(this.$translate.instant('DELETE_USER_SUCCESS'));
      return true;
    })
    .catch((error) => {
      console.log('XHR Failed for deleteUser ' + error.data);
      this.utilsservice.notifyError(this.$translate.instant('DELETE_USER_FAILED'));
      return false;
    });
  }
}
