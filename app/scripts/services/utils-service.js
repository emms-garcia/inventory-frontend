/**
 * @ngdoc service
 * @name inventoryApp.utilsservice
 * @description
 * # utilsservice
 * Service in the inventoryApp.
 */
(function() {
	'use strict';
	angular.module('inventoryApp')
		.service('utilsservice', utilsservice);

	utilsservice.$inject = ['Notification'];

	function utilsservice(Notification) {
		var service = {
			notifySuccess: notifySuccess,
			notifyError: notifyError,
			notifyInformation: notifyInformation
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

		return service;
	}
})();
