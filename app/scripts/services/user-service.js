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
		.service('userservice', userservice);

	userservice.$inject = ['$http', '$translate', 'utilsservice', 'localStorageService', 'LOCAL_STORAGE_KEYS'];

	function userservice($http, $translate, utilsservice, localStorageService, LOCAL_STORAGE_KEYS) {
		var service = {
			logIn: logIn,
			logOut: logOut,
			currentUser: {},
			userList: [],
			getUserDetail: getUserDetail,
			getUserList: getUserList,
			updateUser: updateUser,
			updateUserPassword: updateUserPassword
		};

		function logIn(username, password) {
			return $http({
				method: 'POST',
				url: 'api/inventory/account/login/',
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
				console.log('XHR Failed for logIn.' + error.data);
				return false;
			}
		}

		function logOut() {
			return $http({
				method: 'POST',
				url: 'api/inventory/account/logout/'
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
				console.log('XHR Failed for logOut.' + error.data);
				return false;
			}
		}

		function getUserDetail(id) {
			id = id || localStorageService.get(LOCAL_STORAGE_KEYS.CURRENT_USER);
			return $http({
				method: 'GET',
				url: 'api/inventory/account/' + id + '/'
			})
			.then(getUserSuccess)
			.catch(getUserFailed);

			function getUserSuccess(response) {
				service.currentUser = response.data;
				return response.data;
			}

			function getUserFailed(error) {
				console.log('XHR Failed for getUserDetail' + error.data);
				return {};
			}
		}

		function getUserList() {
			return $http({
				method: 'GET',
				url: 'api/inventory/account/'
			})
			.then(getUserListSuccess)
			.catch(getUserListFailed);

			function getUserListSuccess(response) {
				service.userList = response.data.objects;
				return response.data.objects;
			}

			function getUserListFailed(error) {
				console.log('XHR Failed for getUserList' + error.data);
				utilsservice.notifyError($translate.instant('GET_USER_LIST_FAILED'));
				return [service.currentUser];
			}
		}

		function updateUser(id, data) {
			return $http({
				method: 'PATCH',
				url: 'api/inventory/account/' + id + '/',
				data: data
			})
			.then(updateUserSuccess)
			.catch(updateUserFailed);

			function updateUserSuccess(response) {
				service.currentUser = response.data;
				utilsservice.notifySuccess($translate.instant('UPDATE_USER_SUCCESS'));
				return true;
			}

			function updateUserFailed(error) {
				console.log('XHR Failed for updateUser' + error.data);
				utilsservice.notifyError($translate.instant('UPDATE_USER_FAILED'));
				return false;
			}
		}

		function updateUserPassword(id, newPassword) {
			return $http({
				method: 'PATCH',
				url: 'api/inventory/account/' + id + '/change_password/',
				data: {
					password: newPassword
				}
			})
			.then(updateUserPasswordSuccess)
			.catch(updateUserPasswordFailed);

			function updateUserPasswordSuccess() {
				utilsservice.notifySuccess($translate.instant('UPDATE_PASSWORD_SUCCESS'));
				return true;
			}

			function updateUserPasswordFailed(error) {
				console.log('XHR Failed for updateUser' + error.data);
				utilsservice.notifyError($translate.instant('UPDATE_PASSWORD_FAILED'));
				return false;
			}
		}

		return service;
	}
})();
