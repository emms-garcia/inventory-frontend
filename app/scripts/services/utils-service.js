/**
 * @ngdoc factory
 * @name inventoryApp.utilsservice
 * @description
 * # utilsservice
 * Service in the inventoryApp.
 */
(function() {
	'use strict';
	angular.module('inventoryApp')
		.factory('utilsservice', utilsservice);

	utilsservice.$inject = ['Notification', '$modal'];

	function utilsservice(Notification, $modal) {
		var service = {
			notifySuccess: notifySuccess,
			notifyError: notifyError,
			notifyInformation: notifyInformation,
			notifyWarning: notifyWarning,
			confirmationDialog: confirmationDialog
		};

		function notifySuccess(message) {
			Notification.success(message);
		}

		function notifyError(message) {
			Notification.error(message);
		}

		function notifyInformation(message) {
			Notification.info(message);
		}
		function notifyWarning(message) {
			Notification.warning(message);
		}

		function confirmationDialog(successCallback, errorCallback, config) {
			config = config ? config : {};
			var modalInstance = $modal.open({
				animation: config.animation || true,
				templateUrl: 'views/commons/confirmation-dialog.html',
				controller: 'ConfirmationDialogModalController as vm',
				size: config.size || 'md',
				resolve: {
					config: function() {
						return config;
					}
				}
			});
			modalInstance.result.then(successCallback, errorCallback);
		}

		return service;
	}
})();
