/**
 * @ngdoc factory
 * @name inventoryApp.directoryservice
 * @description
 * # directoryservice
 * Service in the inventoryApp.
 */
(function() {
	'use strict';
	angular.module('inventoryApp')
		.factory('directoryservice', directoryservice);

	directoryservice.$inject = ['$http', '$translate', 'utilsservice'];

	function directoryservice($http, $translate, utilsservice) {
		var service = {
			getClientList: getClientList,
			getClientDetail: getClientDetail,
			updateClientData: updateClientData
		};

		function getClientList() {
			return $http({
				method: 'GET',
				url: '/api/inventory/client/'
			}).then(getClientListSuccess)
			.catch(getClientListError);

			function getClientListSuccess(response) {
				return response.data.objects;
			}

			function getClientListError(error) {
				console.log('XHR failed on getClientListError ' + error);
				utilsservice.notifyError($translate.instant('DIRECTORY_LIST_FAILED'));
				return false;
			}
		}

		function getClientDetail(id) {
			return $http({
				method: 'GET',
				url: '/api/inventory/client/' + id + '/'
			}).then(getClientDetailSuccess)
			.catch(getClientDetailError);

			function getClientDetailSuccess(response) {
				return response.data;
			}

			function getClientDetailError(error) {
				console.log('XHR failed on getClientDetailError ' + error);
				utilsservice.notifyError($translate.instant('DIRECTORY_DETAIL_FAILED'));
				return false;
			}
		}

		function updateClientData(id, data) {
			return $http({
				method: 'PATCH',
				data: data,
				url: '/api/inventory/client/' + id + '/'
			}).then(updateClientDataSuccess)
			.catch(updateClientDataError);

			function updateClientDataSuccess(response) {
				utilsservice.notifySuccess($translate.instant('DIRECTORY_UPDATE_SUCCESS'));
				return response.data;
			}

			function updateClientDataError(error) {
				console.log('XHR failed on updateClientDataError ' + error);
				utilsservice.notifyError($translate.instant('DIRECTORY_UPDATE_FAILED'));
				if(error.data.client) {
					for(var key in data) {
						if(error.data.client[key]) {
							utilsservice.notifyError(error.data.client[key][0]);
						}
					}				
				}
				return false;
			}
		}

		return service;
	}
})();
