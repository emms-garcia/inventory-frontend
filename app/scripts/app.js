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
			'ui-notification'
		]);

	angular
		.module('inventoryApp')
		.config(configure);

		configure.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider', '$translateProvider', 'NotificationProvider'];

	angular
		.module('inventoryApp')
		.run(runBlock);

		runBlock.$inject = ['$rootScope', '$state', 'editableOptions'];

	function configure($httpProvider, $stateProvider, $urlRouterProvider, $translateProvider, NotificationProvider) {

		$translateProvider.useLoader('translationLoader');
		$translateProvider.useSanitizeValueStrategy(null);
		$translateProvider.preferredLanguage('es-mx');

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
		.state('profile', {
			url:'/profile',
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
					templateUrl: 'views/profile/profile.html',
					controller : 'ProfileController',
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
