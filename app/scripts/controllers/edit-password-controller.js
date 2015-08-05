/**
 * @ngdoc function
 * @name inventoryApp.controller:EditPasswordModalController
 * @description
 * # EditPasswordModalController
 * Controller of the inventoryApp
 */

(function () {
	'use strict';

	angular.module('inventoryApp')
		.controller('EditPasswordModalController', EditPasswordModalController);

		EditPasswordModalController.$inject = ['$modalInstance', '$translate', 'userservice', 'user', 'utilsservice'];

		function EditPasswordModalController($modalInstance, $translate, userservice, user, utilsservice) {
			var vm = this;
			vm.password1 = null;
			vm.password2 = null;
			vm.confirm = confirm;
			vm.cancel = cancel;

			function confirm() {
				if(vm.password1 && (vm.password1 === vm.password2)) {
					userservice.updateUserData(user.id, {
						password: vm.password1
					}).then(function(data) {
						if (data) {
							$modalInstance.close();
						}
						
					});
				} else {
					if(!vm.password1 && !vm.password2) {
						utilsservice.notifyError($translate.instant('EMPTY_PASSWORDS'));
					} else {
						utilsservice.notifyError($translate.instant('PASSWORDS_DONT_MATCH'));
					}
				}
			}

			function cancel() {
				$modalInstance.dismiss('cancel');
			}
		}
})();
