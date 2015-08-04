/**
 * @ngdoc function
 * @name inventoryApp.controller:UsersController
 * @description
 * # UsersController
 * Controller of the inventoryApp
 */

(function () {
	'use strict';

	angular.module('inventoryApp')
		.controller('UsersController', UsersController);

		UsersController.$inject = ['userservice', '$modal', 'utilsservice'];

		function UsersController(userservice, $modal, utilsservice) {
			var vm = this;
			vm.updateUserData = updateUserData;
			vm.deleteUser = deleteUser;
			vm.openEditPasswordModal = openEditPasswordModal;
			vm.openCreateUserModal = openCreateUserModal;
			vm.changeUser = changeUser;
			vm.userList = [];

			/* Current logged in user */
			vm.currentUser = userservice.currentUser;
			/* User selected on list */
			vm.selectedUser = null;

			activate();

			function changeUser(user) {
				vm.selectedUser = user;
			}

			function openEditPasswordModal() {
				var modalInstance = $modal.open({
					animation: true,
					templateUrl: 'views/users/modals/edit-password.html',
					controller: 'EditPasswordModalController as vm',
					size: 'md'
				});
				modalInstance.result.then(function (newPassword) {
					userservice.updateUserPassword(vm.selectedUser.id, newPassword);
				}, function () {
				});
			}

			function openCreateUserModal() {
				var modalInstance = $modal.open({
					animation: true,
					templateUrl: 'views/users/modals/create-user.html',
					controller: 'CreateUserModalController as vm',
					size: 'md'
				});
				modalInstance.result.then(function (newUser) {
					loadUserList(newUser);
				});
			}

			function updateUserData(key, value) {
				var data = {};
				data[key] = value;
				return userservice.updateUserData(vm.selectedUser.id, data);
			}

			function deleteUser(user) {
				utilsservice.confirmationDialog(function () {
					userservice.deleteUser(user.id).then(function (){
						loadUserList();
					});
				});
			}

			function loadUserList(selectedUser) {
				userservice.getUserList().then(function (data){
					vm.userList = data;
					if(selectedUser) {
						vm.selectedUser = selectedUser;
					} else {
						vm.selectedUser = data.length > 0 ? data[0] : null;
					}
				});
			}

			function activate() {
				loadUserList();
			}
		}
})();
