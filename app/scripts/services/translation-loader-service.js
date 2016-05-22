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
					ADD_CLIENT_CLIENT: 'Agregar cliente',
					ADD_NEW_USER: 'Agregar usuario',
					ADDRESS: 'Dirección',
					APP_CONFIGURATION: 'Configuración de la aplicación',
					APP_NAME: 'Inventory Web',
					CANCEL: 'Cancelar',
					CANNOT_ADD_PRODUCT_GROUP_NEED_PRODUCT: 'Para crear un grupo de productos es necesario contar por lo menos con un producto. Por favor agrega uno antes de crear un grupo de productos.',
					CANNOT_ADD_PRODUCT_NEED_UOM: 'Para crear un producto es necesario contar con por lo menos una unidad de medida. Por favor agrega una antes de crear un producto.',
					CANT_CREATE_PRODUCT_NO_UOMS: 'No se puede crear un producto. No existen unidades de medida.',
					CELLPHONE: 'Celular',
					CLIENT_CREATE_FAILED: 'No se pudo crear el cliente',
					CLIENT_CREATE_SUCCESS: 'El cliente se creó exitosamente',
					CLIENT_DATA: 'Información del cliente',
					CLIENT_DELETE_FAILED: 'No se pudo borrar al cliente',
					CLIENT_DELETE_SUCCESS: 'El cliente se borró exitosamente',
					CLIENT_DETAIL_FAILED: 'No se pudo obtener la información del cliente',
					CLIENT_LIST: 'Listado de clientes',
					CLIENT_LIST_FAILED: 'No se pudo obtener la lista de clientes',
					CLIENT_UPDATE_FAILED: 'No se pudo actualizar la información del cliente',
					CLIENT_UPDATE_SUCCESS: 'La información del cliente se actualizó exitosamente',
					CLIENTS: 'Directorio de Clientes',
					COMPANY: 'Compañía',
					CONFIRM: 'Confirmar',
					CONFIRMATION_BODY: 'Confirmar acción',
					CONFIRMATION_CANCEL: 'Cancelar',
					CONFIRMATION_CONFIRM: 'Confirmar',
					CONFIRMATION_TITLE: 'Confirmación',
					CREATE: 'Crear',
					CREATE_CLIENT: 'Crear cliente',
					CREATE_PRODUCT: 'Crear Producto',
					CREATE_UOM: 'Crear Unidad de Medida',
					CREATE_USER: 'Crear usuario',
					CREATE_USER_FAILED: 'No se pudo crear un nuevo usuario',
					CREATE_USER_SUCCESS: 'El usuario se creó exitosamente',
					CREATED_AT: 'Fecha de creación',
					DASHBOARD: 'Dashboard',
					DELETE_CLIENT: 'Borrar Cliente',
					DELETE_CLIENT_CONFIRM_BODY: '¿Estás seguro que deseas borrar al cliente?',
					DELETE_CLIENT_CONFIRM_TITLE: 'Borrar Cliente',
					DELETE_PRODUCT: 'Borrar Producto',
					DELETE_PRODUCT_GROUP: 'Borrar Grupo de Productos',
					DELETE_UOM: 'Borrar Unidad de Medida',
					DELETE_USER: 'Borrar usuario',
					DELETE_USER_FAILED: 'No se pudo borrar el usuario',
					DELETE_USER_SUCCESS: 'El usuario fue borrado exitosamente',
					DESCRIPTION: 'Descripción',
					EDIT_PASSWORD: 'Editar contraseña',
					EDIT_PRODUCT: 'Editar Producto',
					EDIT_PRODUCT_GROUP: 'Editar Grupo de Productos',
					EDIT_UOM: 'Editar Unidad de Medida',
					EMAIL: 'Correo',
					EMPTY_PASSWORDS: 'No se especificaron contraseñas',
					FIELD_EMAIL: 'Este campo debe ser un email',
					FIELD_REQUIRED: 'Este campo es requerido',
					FIRST_NAME: 'Nombre(s)',
					FORGOT_PASSWORD: 'Olvidaste tu contraseña?',
					GENERAL_SETTINGS: 'Configuración General',
					GEOLOCATION: 'Geolocalización',
					GET_USER_LIST_FAILED: 'No se pudo obtener la lista de usuarios',
					ID: 'Id',
					INVENTORY: 'Inventario',
					LAST_LOGIN: 'Último inicio de sesión',
					LAST_NAME: 'Apellido(s)',
					LOCATION: 'Ubicación',
					LOG_IN: 'Ingresar',
					LOGIN_FAILED: 'Usuario o contraseña inválido',
					LOGIN_SUCCESS: 'Sesión iniciada exitosamente',
					LOGOUT: 'Salir',
					LOGOUT_SUCCESS: 'Sesión cerrada exitosamente',
					MISSING_DATA: 'Falta información',
					NAME: 'Nombre',
					NEVER_LOGGED_IN: 'No ha iniciado sesión',
					NEW_PASSWORD: 'Nueva contraseña',
					NO_CLIENTS_DEFINED: 'No se han agregado clientes',
					NO_FIRST_NAME: 'No especificado',
					NO_LAST_NAME: 'No especificado',
					NO_PRODUCTS_DEFINED: 'No se han agregado productos',
					NO_RESULTS: 'No se encontró información',
					NO_UOMS_DEFINED: 'No se han agregado unidades de medida',
					OPEN_ON_GMAPS: 'Abrir en GoogleMaps',
					PASSWORD: 'Contraseña',
					PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
					PERMISSIONS: 'Permisos',
					PERSONAL_DATA: 'Datos personales',
					PHONE: 'Teléfono',
					PRICE_PER_UOM: 'Precio por Unidad de Medida',
					PRODUCTS: 'Productos',
					PROFILE: 'Perfil',
					PURCHASES: 'Compras',
					R: 'Solo lectura',
					READ_ONLY_ACCOUNT: 'Solo lectura',
					REMOVE_CLIENT_CLIENT: 'Borrar cliente',
					REPEAT_NEW_PASSWORD: 'Repetir nueva contraseña',
					REPEAT_PASSWORD: 'Repetir contraseña',
					RFC: 'RFC',
					RW: 'Lectura y Escritura',
					RWD: 'Lectura, Escritura, Borrado',
					SALES: 'Ventas',
					SEARCH: 'Buscar',
					SETTINGS: 'Configuración',
					SIGN_UP: 'Crear cuenta',
					UOM: 'Unidad de Medida',
					UOMS: 'Unidades de Medida',
					UPDATE_GEOLOCATION: 'Actualizar ubicación',
					UPDATE_PASSWORD_ERROR: 'No se pudo actualizar la contraseña',
					UPDATE_PASSWORD_SUCCESS: 'Contraseña actualizada exitosamente',
					UPDATE_USER_FAILED: 'No se pudo actualizar la información',
					UPDATE_USER_SUCCESS: 'Información actualizada exitosamente',
					USERNAME: 'Nombre de usuario',
					USERS: 'Usuarios',
					PRODUCT_CREATE_SUCCESS: 'El Producto se creó exitosamente',
					PRODUCT_CREATE_ERROR: 'No se pudo crear el producto',
					PRODUCT_DELETE_SUCCESS: 'El producto fue borrado exitosamente',
					PRODUCT_DELETE_ERROR: 'No se pudo borrar el producto',
					PRODUCT_GROUPS: 'Grupo de Productos',
					CREATE_PRODUCT_GROUP: 'Crear Grupo de Productos',
					SELECT_PRODUCTS: 'Selecciona los productos del grupo',
					USE: 'Usar',
					TOTAL: 'Total',
					UOM_CREATE_SUCCESS: 'La Unidad de Medida se creó exitosamente',
					UOM_CREATE_ERROR: 'No se pudo crear la Unidad de Medida',
					UOM_DELETE_SUCCESS: 'Unidad de Medida borrada exitosamente',
					UOM_DELETE_ERROR: 'No se pudo borrar la Unidad de Medida',
					PRODUCT_GROUP_DELETE_SUCCESS: 'El Grupo de Productos fue borrado exitosamente',
					PRODUCT_GROUP_DELETE_ERROR: 'No se pudo borrar el Grupo de Productos',
					PRODUCT_GROUP_CREATE_SUCCESS: 'El Grupo de Productos se creó exitosamente',
					PRODUCT_GROUP_CREATE_ERROR: 'No se pudo crear el Grupo de Productos',
					QUANTITIES: 'Cantidades',
				};
			} else if(options.key === 'en-us') {
				translations = {
					QUANTITIES: 'Quantities',
					TOTAL: 'Total',
					PRODUCT_GROUP_CREATE_SUCCESS: 'Product Group created successfully',
					PRODUCT_GROUP_CREATE_ERROR: 'Failed to create Product Group',
					PRODUCT_GROUP_DELETE_SUCCESS: 'Product Group deleted successfully ',
					PRODUCT_GROUP_DELETE_ERROR: 'Failed to delete Product Group',
					UOM_CREATE_SUCCESS: 'Unit of Measure created successfully',
					UOM_CREATE_ERROR: 'Failed to create Unit of Measure',
					UOM_DELETE_SUCCESS: 'Unit of Measure deleted successfully',
					UOM_DELETE_ERROR: 'Faield to delete Unit of Measure',
					TOTAL: 'Total',
					USE: 'Use',
					SELECT_PRODUCTS: 'Select products for the group',
					CREATE_PRODUCT_GROUP: 'Create Product Group',
					PRODUCT_CREATE_SUCCESS: 'Product created successfully',
					PRODUCT_CREATE_ERROR: 'Failed to create product',
					PRODUCT_DELETE_SUCCESS: 'Product deleted successfully',
					PRODUCT_DELETE_ERROR: 'Failed to delete product',
					PRODUCT_GROUPS: 'Product Groups',
					ADD_CLIENT_CLIENT: 'Add client',
					ADD_NEW_USER: 'Agregar usuario',
					ADDRESS: 'Address',
					APP_CONFIGURATION: 'App configuration',
					APP_NAME: 'Inventory Web',
					CANCEL: 'Cancel',
					CANNOT_ADD_PRODUCT_GROUP_NEED_PRODUCT: 'To create a product group you must have at least one product. Please add one before creating a product group',
					CANNOT_ADD_PRODUCT_NEED_UOM: 'To create a product you must have at least one Unit of Measure. Please add one before creating a product.',
					CANT_CREATE_PRODUCT_NO_UOMS: 'Cannot create product. No units of measures defined yet.',
					CELLPHONE: 'Cellphone',
					CLIENT_CREATE_FAILED: 'Failed to create client',
					CLIENT_CREATE_SUCCESS: 'Client created successfully',
					CLIENT_DATA: 'Client data',
					CLIENT_DELETE_FAILED: 'Failed to delete client',
					CLIENT_DELETE_SUCCESS: 'Client deleted successfully',
					CLIENT_DETAIL_FAILED: 'Failed to load client information',
					CLIENT_LIST: 'Client list',
					CLIENT_LIST_FAILED: 'Failed to load client list',
					CLIENT_UPDATE_FAILED: 'Failed to update client data',
					CLIENT_UPDATE_SUCCESS: 'Client data updated successfully',
					CLIENTS: 'Clients',
					COMPANY: 'Company',
					CONFIRM: 'Confirm',
					CONFIRMATION_BODY: 'Confirm action',
					CONFIRMATION_CANCEL: 'Cancel',
					CONFIRMATION_CONFIRM: 'Confirm',
					CONFIRMATION_TITLE: 'Confirmation',
					CREATE: 'Create',
					CREATE_CLIENT: 'Create client',
					CREATE_PRODUCT: 'Create Product',
					CREATE_UOM: 'Create Unit of Measure',
					CREATE_USER: 'Create user',
					CREATE_USER_FAILED: 'Failed to create user',
					CREATE_USER_SUCCESS: 'User created successfully',
					CREATED_AT: 'Created at',
					DASHBOARD: 'Dashboard',
					DELETE_CLIENT: 'Delete Client',
					DELETE_CLIENT_CONFIRM_BODY: 'Are you sure you want to remove this client?',
					DELETE_CLIENT_CONFIRM_TITLE: 'Delete Client',
					DELETE_PRODUCT: 'Delete Product',
					DELETE_PRODUCT_GROUP: 'Delete Product Group',
					DELETE_UOM: 'Delete Unit of Measure',
					DELETE_USER: 'Delete user',
					DELETE_USER_FAILED: 'Failed to delete user',
					DELETE_USER_SUCCESS: 'User deleted successfully',
					DESCRIPTION: 'Description',
					EDIT_PASSWORD: 'Edit password',
					EDIT_PRODUCT: 'Edit Product',
					EDIT_PRODUCT_GROUP: 'Edit Product Group',
					EDIT_UOM: 'Edit Unit of Measure',
					EMAIL: 'Email',
					EMPTY_PASSWORDS: 'Passwords are empty',
					FIELD_EMAIL: 'This field must be an email',
					FIELD_REQUIRED: 'This field is required',
					FIRST_NAME: 'First name',
					FORGOT_PASSWORD: 'Forgot your password?',
					GENERAL_SETTINGS: 'General Settings',
					GEOLOCATION: 'Geolocation',
					GET_USER_LIST_FAILED: 'Failed to load user list',
					ID: 'Id',
					INVENTORY: 'Inventory',
					LAST_LOGIN: 'Last login',
					LAST_NAME: 'Last name',
					LOCATION: 'Location',
					LOG_IN: 'Sign in',
					LOGIN_FAILED: 'Wrong username or password',
					LOGIN_SUCCESS: 'Successful login',
					LOGOUT: 'Sign out',
					LOGOUT_SUCCESS: 'Logged out successfully',
					MISSING_DATA: 'Missing information',
					NAME: 'Name',
					NEVER_LOGGED_IN: 'Not logged in yet',
					NEW_PASSWORD: 'New password',
					NO_CLIENTS_DEFINED: 'No clients defined',
					NO_FIRST_NAME: 'Not specified',
					NO_LAST_NAME: 'Not specified',
					NO_PRODUCTS_DEFINED: 'No products defined',
					NO_RESULTS: 'No data found',
					NO_UOMS_DEFINED: 'No unit of measures defined',
					OPEN_ON_GMAPS: 'OPEN_ON_GMAPS',
					PASSWORDS_DONT_MATCH: 'Passwords don\'t match',
					PERMISSIONS: 'Permissions',
					PERSONAL_DATA: 'Personal data',
					PHONE: 'Phone',
					PRICE_PER_UOM: 'Price per Unit of Measure',
					PRODUCTS: 'Products',
					PROFILE: 'Profile',
					PURCHASES: 'Purchases',
					R: 'Read only',
					READ_ONLY_ACCOUNT: 'Solo lectura',
					REMOVE_CLIENT_CLIENT: 'Delete client',
					REPEAT_NEW_PASSWORD: 'Repeat new password',
					REPEAT_PASSWORD: 'Repeat password',
					RFC: 'RFC',
					RW: 'Read and write',
					RWD: 'Read, Write, Delete',
					SALES: 'Sales',
					SEARCH: 'Search',
					SETTINGS: 'Settings',
					SIGN_UP: 'Sign Up',
					UOM: 'Unit of Measure',
					UOMS: 'Units of Measure',
					UPDATE_GEOLOCATION: 'Update geolocation',
					UPDATE_PASSWORD_ERROR: 'Failed to update password',
					UPDATE_PASSWORD_SUCCESS: 'Password updated successfully',
					UPDATE_USER_FAILED: 'Failed to update user data',
					UPDATE_USER_SUCCESS: 'User data updated successfully',
					USERNAME: 'Password',
					USERS: 'Users'
				};
			}
			$timeout(function(){
				deferred.resolve(translations);
			}, 100);

			return deferred.promise;
		};
	}
})();
