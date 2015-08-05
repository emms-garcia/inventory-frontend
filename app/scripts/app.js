/**
 * @ngdoc overview
 * @name inventoryApp
 * @description
 * # inventoryApp
 *
 * Main module of the application.
 */
(function () {
	'use strict';

	angular
		.module('inventoryApp', [
			'ui.bootstrap',
			'ngAnimate',
			'ngResource',
			'ngRoute',
			'LocalStorageModule',
			'ui.router',
			'pascalprecht.translate',
			'xeditable',
			'ui-notification',
			'uiGmapgoogle-maps'
		]);

	angular
		.module('inventoryApp')
		.config(configure);

		configure.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider', '$translateProvider', 'NotificationProvider', 'uiGmapGoogleMapApiProvider'];

	angular
		.module('inventoryApp')
		.run(runBlock);

		runBlock.$inject = ['$rootScope', '$state', 'editableOptions'];

	function configure($httpProvider, $stateProvider, $urlRouterProvider, $translateProvider, NotificationProvider, uiGmapGoogleMapApiProvider) {

		$translateProvider.useLoader('translationLoader');
		$translateProvider.useSanitizeValueStrategy(null);
		$translateProvider.preferredLanguage('es-mx');

		uiGmapGoogleMapApiProvider.configure({
			//    key: 'your api key',
			v: '3.17',
			libraries: 'visualization'
		});

		NotificationProvider.setOptions({
			delay: 5000, 
			startTop: 50, 
			startRight: 10, 
			verticalSpacing: 20, 
			horizontalSpacing: 20, 
			positionX: 'right', 
			positionY: 'top' 
		});	
		
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
		$httpProvider.defaults.headers.post = {
			'Content-Type': 'application/json'
		};

		$urlRouterProvider.otherwise('dashboard');

		$stateProvider
		.state('login', {
			url:'/login',
			authenticate : false,
			views: {
				'mainContainer': {
					templateUrl: 'views/commons/login.html',
					controller : 'LoginController',
					controllerAs: 'vm'
				 },
			}
		})
		.state('template', {
			abstract: true,
			authenticate : true,
			resolve: {
				currentUser: function(userservice) {
					return userservice.getCurrentUser();
				}
			},
			views: {
				'headerContainer': {
					templateUrl: 'views/commons/header-container.html',
					controller : 'HeaderController',
					controllerAs: 'vm'
				},
				'sidebarContainer': {
					templateUrl: 'views/commons/sidebar-container.html',
					controller: 'SidebarController',
					controllerAs: 'vm'
				},
				'mainContainer': {}
			}
		})
		.state('dashboard', {
			url:'/dashboard',
			authenticate : true,
			parent: 'template',
			views: {
				'mainView': {
					templateUrl: 'views/dashboard/dashboard.html',
					controller : 'DashboardController',
					controllerAs: 'vm'
				 },
			}
		})
		.state('inventory', {
			url:'/inventory',
			authenticate : true,
			parent: 'template',
			views: {
				'mainView': {
					templateUrl: 'views/inventory/inventory.html',
					controller : 'InventoryController',
					controllerAs: 'vm'
				 },
			}
		})
		.state('directory', {
			url:'/directory',
			authenticate : true,
			parent: 'template',
			views: {
				'mainView': {
					templateUrl: 'views/directory/directory.html',
					controller : 'DirectoryController',
					controllerAs: 'vm'
				 },
			}
		})
		.state('directory.detail', {
			url:'/directory/:clientId',
			authenticate : true,
			parent: 'template',
			views: {
				'mainView': {
					templateUrl: 'views/directory/directory-detail.html',
					controller : 'DirectoryDetailController',
					controllerAs: 'vm'
				 },
			}
		})
		.state('users', {
			url:'/users',
			authenticate : true,
			resolve: {
				currentUser: function(userservice) {
					return userservice.getCurrentUser();
				}
			},
			views: {
				'headerContainer': {
					templateUrl: 'views/commons/header-container.html',
					controller : 'HeaderController',
					controllerAs: 'vm'
				},
				'mainView': {
					templateUrl: 'views/users/users.html',
					controller : 'UsersController',
					controllerAs: 'vm'
				 },
			}
		});
	}

	function runBlock($rootScope, $state, editableOptions){
		$rootScope.$state = $state;
		editableOptions.theme = 'bs3';
		/*
		$rootScope.$on('$stateChangeStart', function (event, current) {
		});
		*/
	}

})();
