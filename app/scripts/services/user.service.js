/**
 * @ngdoc service
 * @name inventoryApp.userservice
 * @description
 * # userservice
 * Service in the inventoryApp.
 */
(function() {
  'use strict';
  angular.module('inventoryApp')
    .factory('userservice', userservice);

  userservice.$inject = [
    '$http',
    '$state',
    '$translate',
    'utilsservice',
    'localStorageService',
    'LOCAL_STORAGE_KEYS'
  ];

  function userservice(
      $http,
      $state,
      $translate,
      utilsservice,
      localStorageService,
      LOCAL_STORAGE_KEYS) {

    var service = {
      logIn: logIn,
      logOut: logOut,
      currentUser: {},
      userList: [],
      getCurrentUser: getCurrentUser,
      getUserList: getUserList,
      createUser: createUser,
      updateUserData: updateUserData,
      deleteUser: deleteUser
    };

    function logIn(username, password) {
      return $http({
        method: 'POST',
        url: 'api/inventory/users/login/',
        data: {
          username: username,
          password: password
        },
      })
      .then(loginSuccess)
      .catch(loginFailed);

      function loginSuccess(response) {
        service.currentUser = response.data;
        localStorageService.set(LOCAL_STORAGE_KEYS.CURRENT_USER, service.currentUser.id);
        utilsservice.notifySuccess($translate.instant('LOGIN_SUCCESS'));
        return true;
      }

      function loginFailed(error) {
        utilsservice.notifyError($translate.instant('LOGIN_FAILED'));
        console.log('XHR Failed for logIn ' + error.data);
        return false;
      }
    }

    function logOut() {
      return $http({
        method: 'POST',
        url: 'api/inventory/users/logout/'
      })
      .then(logoutSuccess)
      .catch(logoutFailed);

      function logoutSuccess() {
        service.currentUser = {};
        localStorageService.remove(LOCAL_STORAGE_KEYS.CURRENT_USER);
        utilsservice.notifyInformation($translate.instant('LOGOUT_SUCCESS'));
        return true;
      }

      function logoutFailed(error) {
        console.log('XHR Failed for logOut ' + error.data);
        return false;
      }
    }

    function getCurrentUser() {
      var id = localStorageService.get(LOCAL_STORAGE_KEYS.CURRENT_USER);
      return $http({
        method: 'GET',
        url: 'api/inventory/users/' + id + '/'
      })
      .then(getUserSuccess)
      .catch(getUserFailed);

      function getUserSuccess(response) {
        service.currentUser = response.data;
        return response.data;
      }

      function getUserFailed(error) {
        console.log('XHR Failed for getCurrentUser ' + error.data);
        localStorageService.remove(LOCAL_STORAGE_KEYS.CURRENT_USER);
        $state.go('login');
        return false;
      }
    }

    function getUserList() {
      return $http({
        method: 'GET',
        url: 'api/inventory/users/'
      })
      .then(getUserListSuccess)
      .catch(getUserListFailed);

      function getUserListSuccess(response) {
        service.userList = response.data.objects;
        return response.data.objects;
      }

      function getUserListFailed(error) {
        console.log('XHR Failed for getUserList ' + error.data);
        utilsservice.notifyError($translate.instant('GET_USER_LIST_FAILED'));
        return [service.currentUser];
      }
    }

    function createUser(data) {
      return $http({
        method: 'POST',
        url: 'api/inventory/users/signup/',
        data: data
      })
      .then(createUserSuccess)
      .catch(createUserFailed);

      function createUserSuccess(response) {
        utilsservice.notifySuccess($translate.instant('CREATE_USER_SUCCESS'));
        return response.data;
      }

      function createUserFailed(error) {
        console.log('XHR Failed for createUserFailed ' + error.data);
        utilsservice.notifyError($translate.instant('CREATE_USER_FAILED'));
        if(error.data.users) {
          for(var key in error.data.users) {
            if(error.data.users[key]) {
              utilsservice.notifyError(error.data.users[key][0]);
            }
          }
        } else if(error.data) {
          utilsservice.notifyError(error.data);
        }
        return false;
      }
    }

    function updateUserData(id, data) {
      return $http({
        method: 'PATCH',
        url: 'api/inventory/users/' + id + '/',
        data: data
      })
      .then(updateUserSuccess)
      .catch(updateUserFailed);

      function updateUserSuccess(response) {
        utilsservice.notifySuccess($translate.instant('UPDATE_USER_SUCCESS'));
        return response.data;
      }

      function updateUserFailed(error) {
        console.log('XHR Failed for updateUserData ' + error.data);
        utilsservice.notifyError($translate.instant('UPDATE_USER_FAILED'));
        if(error.data.users) {
          for(var key in error.data.users) {
            if(error.data.users[key]) {
              utilsservice.notifyError(error.data.users[key][0]);
            }
          }
        }
        return false;
      }
    }

    function deleteUser(id) {
      return $http({
        method: 'DELETE',
        url: 'api/inventory/users/' + id + '/'
      })
      .then(deleteUserSuccess)
      .catch(deleteUserFailed);

      function deleteUserSuccess() {
        utilsservice.notifySuccess($translate.instant('DELETE_USER_SUCCESS'));
        return true;
      }

      function deleteUserFailed(error) {
        console.log('XHR Failed for deleteUser ' + error.data);
        utilsservice.notifyError($translate.instant('DELETE_USER_FAILED'));
        return false;
      }
    }
    return service;
  }
})();
