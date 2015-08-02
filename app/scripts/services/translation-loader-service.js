/**
 * @ngdoc service
 * @name inventoryApp.translationLoader
 * @description
 * # translationLoader
 * Factory in the inventoryApp.
 */
(function() {
	'use strict';

	angular
		.module('inventoryApp')
		.factory('translationLoader', Translation);

	Translation.$inject = ['$q', '$timeout'];

	function Translation($q, $timeout) {
		return function (options) {
			var deferred = $q.defer(), translations;

			if(options.key === 'es-mx') {
				translations = {
					APP_NAME: 'Inventory Web',
					USERNAME: 'Nombre de usuario',
					PASSWORD: 'Contraseña',
					LOG_IN: 'Ingresar',
					DASHBOARD: 'Dashboard',
					PROFILE: 'Perfil',
					SETTINGS: 'Configuración',
					LOGOUT: 'Salir',
					INVENTORY: 'Inventario',
					PERSONAL_DATA: 'Datos personales',
					APP_CONFIGURATION: 'Configuración de la aplicación',
					FIRST_NAME: 'Nombre(s)',
					NO_FIRST_NAME: 'No especificado',
					LAST_NAME: 'Apellido(s)',
					NO_LAST_NAME: 'No especificado',
					CREATED_AT: 'Fecha de creación',
					LAST_LOGIN: 'Último inicio de sesión',
					PERMISSIONS: 'Permisos',
					RWD: 'Lectura, Escritura, Borrado',
					R: 'Solo lectura',
					RW: 'Lectura y Escritura',
					EDIT_PASSWORD: 'Editar contraseña',
					NEW_PASSWORD: 'Nueva contraseña',
					REPEAT_NEW_PASSWORD: 'Repetir nueva contraseña',
					EMPTY_PASSWORDS: 'No se especificaron contraseñas',
					PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
					CONFIRM: 'Confirmar',
					CANCEL: 'Cancelar',
					LOGIN_SUCCESS: 'Sesión iniciada exitosamente',
					LOGIN_FAILED: 'Usuario o contraseña inválido',
					LOGOUT_SUCCESS: 'Sesión cerrada exitosamente',
					GET_USER_LIST_FAILED: 'No se pudo obtener la lista de usuarios',
					UPDATE_USER_FAILED: 'No se pudo actualizar la información',
					UPDATE_USER_SUCCESS: 'Información actualizada exitosamente',
					UPDATE_PASSWORD_SUCCESS: 'Contraseña actualizada exitosamente',
					UPDATE_PASSWORD_ERROR: 'No se pudo actualizar la contraseña'
				};
			} else if(options.key === 'en-us') {
				translations = {
					APP_NAME: 'Inventory Web',
					USERNAME: 'Password',
					LOG_IN: 'Sign in',
					DASHBOARD: 'Dashboard',
					PROFILE: 'Profile',
					SETTINGS: 'Settings',
					LOGOUT: 'Sign out',
					INVENTORY: 'Inventory',
					PERSONAL_DATA: 'Personal data',
					APP_CONFIGURATION: 'App configuration',
					FIRST_NAME: 'First name',
					NO_FIRST_NAME: 'Not specified',
					LAST_NAME: 'Last name',
					NO_LAST_NAME: 'Not specified',
					CREATED_AT: 'Created at',
					LAST_LOGIN: 'Last login',
					PERMISSIONS: 'Permissions',
					RWD: 'Read, Write, Delete',
					R: 'Read only',
					RW: 'Read and write',
					EDIT_PASSWORD: 'Edit password',
					NEW_PASSWORD: 'New password',
					REPEAT_NEW_PASSWORD: 'Repeat new password',
					EMPTY_PASSWORDS: 'Passwords are empty',
					PASSWORDS_DONT_MATCH: 'Passwords don\'t match',
					CONFIRM: 'Confirm',
					CANCEL: 'Cancel',
					LOGIN_SUCCESS: 'Successful login',
					LOGIN_FAILED: 'Wrong username or password',
					LOGOUT_SUCCESS: 'Logged out successfully',
					GET_USER_LIST_FAILED: 'Failed to load user list',
					UPDATE_USER_FAILED: 'Failed to update user data',
					UPDATE_USER_SUCCESS: 'User data updated successfully',
					UPDATE_PASSWORD_SUCCESS: 'Password updated successfully',
					UPDATE_PASSWORD_ERROR: 'Failed to update password'
				};
			}
			$timeout(function(){
				deferred.resolve(translations);
			}, 100);

			return deferred.promise;
		};
	}
})();
