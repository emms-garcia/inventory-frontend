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
			vm.userList = [];
			vm.currentUser = null;
			vm.myUser = null;

			activate();

			function openEditPasswordModal() {
				var modalInstance = $modal.open({
					animation: true,
					templateUrl: 'views/profile/modals/edit-password.html',
					controller: 'EditPasswordModalController as vm',
					size: 'md'
				});
				modalInstance.result.then(function (newPassword) {
					userservice.updateUserPassword(vm.currentUser.id, newPassword);
				}, function () {
				});
			}

			function updateUserData(key, value) {
				var data = {};
				data[key] = value;
				return userservice.updateUser(vm.currentUser.id, data);
			}

			function activate() {
				userservice.getUserDetail().then(function(data){
					vm.myUser = data;
				});

				userservice.getUserList().then(function(data){
					vm.userList = data;
					vm.currentUser = data.length > 0 ? data[0] : null;
				});
			}
		}
})();
