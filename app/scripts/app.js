import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngFileUpload from 'ng-file-upload';
import ngLocalStorage from 'angular-local-storage';
import ngRoute from 'angular-route';
import ngTranslate from 'angular-translate';
import ngXeditable from 'angular-xeditable';
import uiBootstrap from 'angular-ui-bootstrap';
import uiNotification from 'angular-ui-notification';
import UiRouter from 'angular-ui-router';

import Controllers from './controllers';
import Directives from './directives';
import Services from './services';

angular
  .module('inventoryApp', [
    ngAnimate,
    ngFileUpload,
    ngLocalStorage,
    ngRoute,
    ngTranslate,
    ngXeditable,
    uiBootstrap,
    uiNotification,
    UiRouter,
    Controllers.name,
    Services.name,
    Directives.name
  ])
  .config(configure);

function configure(
  $httpProvider,
  $stateProvider,
  $translateProvider,
  $urlRouterProvider,
  NotificationProvider) {

  $translateProvider.useLoader('translationloaderservice');
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
    authenticate : false,
    url:'/login',
    views: {
      mainContainer: {
        controller : 'LoginController',
        controllerAs: 'vm',
        templateUrl: 'views/commons/login.html'
      }
    }
  })
  .state('signup', {
    authenticate : false,
    url:'/signup',
    views: {
      mainContainer: {
        controller : 'SignUpController',
        controllerAs: 'vm',
        templateUrl: 'views/commons/signup.html'
      }
    }
  })
  .state('base', {
    abstract: true,
    authenticate : true,
    resolve: {
      currentUser: function(userservice) {
        return userservice.getCurrentUser();
      }
    },
    template: '<ui-view/>',
    views: {
      mainContainer: {},
      sidebarContainer: {
        controller: 'SidebarController',
        controllerAs: 'vm',
        templateUrl: 'views/commons/sidebar-container.html'
      }
    }
  })
  .state('dashboard', {
    authenticate : true,
    parent: 'base',
    url:'/dashboard',
    views: {
      mainView: {
        controller : 'DashboardController',
        controllerAs: 'vm',
        templateUrl: 'views/dashboard/dashboard.html'
      }
    }
  })
  .state('warehouses', {
    authenticate : true,
    parent: 'base',
    url:'/warehouses',
    views: {
      mainView: {
        controller : 'WarehousesController',
        controllerAs: 'vm',
        templateUrl: 'views/warehouses/warehouses.html'
      }
    }
  })
  .state('inventory', {
    authenticate : true,
    parent: 'base',
    url:'/inventory',
    views: {
      mainView: {
        controller : 'InventoryController',
        controllerAs: 'vm',
        templateUrl: 'views/inventory/inventory.html'
      }
    }
  })
  .state('sales', {
    authenticate : true,
    parent: 'base',
    url:'/sales',
    views: {
      mainView: {
        controller : 'SalesController',
        controllerAs: 'vm',
        templateUrl: 'views/sales/sales.html'
      }
    }
  })
  .state('purchases', {
    authenticate : true,
    parent: 'base',
    url:'/purchases',
    views: {
      mainView: {
        controller : 'PurchasesController',
        controllerAs: 'vm',
        templateUrl: 'views/purchases/purchases.html'
      }
    }
  })
  .state('clients', {
    authenticate : true,
    parent: 'base',
    url:'/clients',
    views: {
      mainView: {
        controller : 'ClientsController',
        controllerAs: 'vm',
        templateUrl: 'views/clients/clients.html'
      }
    }
  })
  .state('clients.detail', {
    authenticate : true,
    parent: 'base',
    url:'/clients/:clientId',
    views: {
      mainView: {
        controller : 'ClientsDetailController',
        controllerAs: 'vm',
        templateUrl: 'views/clients/clients-detail.html'
      }
    }
  })
  .state('settings', {
    authenticate : true,
    url:'/settings',
    parent: 'base',
    resolve: {
      currentUser: function(userservice) {
        return userservice.getCurrentUser();
      }
    },
    views: {
      mainView: {
        controller : 'SettingsController',
        controllerAs: 'vm',
        templateUrl: 'views/settings/settings.html'
      }
    }
  })
  .state('users', {
    authenticate: true,
    url: '/users',
    resolve: {
      currentUser: function(userservice) {
        return userservice.getCurrentUser();
      }
    },
    views: {
      mainView: {
        controller : 'UsersController',
        controllerAs: 'vm',
        templateUrl: 'views/users/users.html'
      }
    }
  });
}

configure.$inject = [
  '$httpProvider',
  '$stateProvider',
  '$translateProvider',
  '$urlRouterProvider',
  'NotificationProvider',
];
