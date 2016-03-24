/**
 * @ngdoc factory
 * @name inventoryApp.clientsservice
 * @description
 * # clientsservice
 * Service in the inventoryApp.
 */
(function() {
	'use strict';
	angular.module('inventoryApp')
		.factory('clientsservice', clientsservice);

	clientsservice.$inject = ['$http', '$translate', 'utilsservice'];

	function clientsservice($http, $translate, utilsservice) {
		var service = {
			getClientList: getClientList,
			getClientDetail: getClientDetail,
			updateClientData: updateClientData,
			createClient: createClient,
			deleteClient: deleteClient
		};

		function getClientList() {
			return $http({
				method: 'GET',
				url: '/api/inventory/clients/'
			}).then(getClientListSuccess)
			.catch(getClientListError);

			function getClientListSuccess(response) {
				return response.data.objects;
			}

			function getClientListError(error) {
				console.log('XHR failed on getClientListError ' + error);
				utilsservice.notifyError($translate.instant('CLIENT_LIST_FAILED'));
				return false;
			}
		}

		function getClientDetail(id) {
			return $http({
				method: 'GET',
				url: '/api/inventory/clients/' + id + '/'
			}).then(getClientDetailSuccess)
			.catch(getClientDetailError);

			function getClientDetailSuccess(response) {
				return response.data;
			}

			function getClientDetailError(error) {
				console.log('XHR failed on getClientDetailError ' + error);
				utilsservice.notifyError($translate.instant('CLIENT_DETAIL_FAILED'));
				return false;
			}
		}

		function updateClientData(id, data) {
			return $http({
				method: 'PATCH',
				data: data,
				url: '/api/inventory/clients/' + id + '/'
			}).then(updateClientDataSuccess)
			.catch(updateClientDataError);

			function updateClientDataSuccess(response) {
				utilsservice.notifySuccess($translate.instant('CLIENT_UPDATE_SUCCESS'));
				return response.data;
			}

			function updateClientDataError(error) {
				console.log('XHR failed on updateClientDataError ' + error);
				utilsservice.notifyError($translate.instant('CLIENT_UPDATE_FAILED'));
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

		function createClient(data) {
			return $http({
				method: 'POST',
				data: data,
				url: '/api/inventory/clients/'
			}).then(createClientSuccess)
			.catch(createClientError);

			function createClientSuccess(response) {
				utilsservice.notifySuccess($translate.instant('CLIENT_CREATE_SUCCESS'));
				return response.data;
			}

			function createClientError(error) {
				console.log('XHR failed on createClientError ' + error);
				utilsservice.notifyError($translate.instant('CLIENT_CREATE_FAILED'));
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

		function deleteClient(id) {
			return $http({
				method: 'DELETE',
				url: '/api/inventory/clients/' + id + '/'
			}).then(deleteClientSuccess)
			.catch(deleteClientError);

			function deleteClientSuccess() {
				utilsservice.notifySuccess($translate.instant('CLIENT_DELETE_SUCCESS'));
				return true;
			}

			function deleteClientError(error) {
				console.log('XHR failed on deleteClientError ' + error);
				utilsservice.notifyError($translate.instant('CLIENT_DELETE_FAILED'));
				return false;
			}
		}

		return service;
	}
})();
