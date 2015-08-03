/**
 * @ngdoc function
 * @name inventoryApp.controller:ProfileController
 * @description
 * # ProfileController
 * Controller of the inventoryApp
 */

(function () {
	'use strict';

	angular.module('inventoryApp')
		.controller('ProfileController', ProfileController);

		ProfileController.$inject = ['userservice', '$modal'];

		function ProfileController(userservice, $modal) {
			var vm = this;
			vm.updateUserData = updateUserData;
			vm.openEditPasswordModal = openEditPasswordModal;
			vm.openCreateUserModal = openCreateUserModal;
			vm.userList = [];

			/* Current logged in user */
			vm.currentUser = userservice.currentUser;
			/* User selected on list */
			vm.user = null;

			activate();

			function openEditPasswordModal() {
				var modalInstance = $modal.open({
					animation: true,
					templateUrl: 'views/profile/modals/edit-password.html',
					controller: 'EditPasswordModalController as vm',
					size: 'md'
				});
				modalInstance.result.then(function (newPassword) {
					userservice.updateUserPassword(vm.user.id, newPassword);
				}, function () {
				});
			}

			function openCreateUserModal() {
				var modalInstance = $modal.open({
					animation: true,
					templateUrl: 'views/profile/modals/create-user.html',
					controller: 'CreateUserModalController as vm',
					size: 'md'
				});
				modalInstance.result.then(function (data) {
					userservice.createUser(data);
				}, function () {
				});
			}

			function updateUserData(key, value) {
				var data = {};
				data[key] = value;
				return userservice.updateUser(vm.user.id, data);
			}

			function activate() {
				userservice.getUserList().then(function (data){
					vm.userList = data;
					vm.user = data.length > 0 ? data[0] : null;
				});
			}
		}
})();
