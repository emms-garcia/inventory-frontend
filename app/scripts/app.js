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
  .config(configure)
  .run(run);

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
    controller : 'LoginController',
    controllerAs: 'vm',
    templateUrl: 'assets/views/commons/login.html'
  })
  .state('signup', {
    authenticate : false,
    url:'/signup',
    controller : 'SignUpController',
    controllerAs: 'vm',
    templateUrl: 'assets/views/commons/signup.html'
  })
  .state('base', {
    abstract: true,
    authenticate : true,
    controller: 'BaseController',
    controllerAs: 'vm',
    resolve: {
      currentUser: function(userservice) {
        return userservice.getCurrentUser();
      }
    },
    templateUrl: 'assets/views/commons/base.html'
  })
  .state('dashboard', {
    authenticate : true,
    parent: 'base',
    url:'/dashboard',
    views: {
      mainContainer: {
        controller : 'DashboardController',
        controllerAs: 'vm',
        templateUrl: 'assets/views/dashboard/dashboard.html'
      }
    }
  })
  .state('warehouses', {
    authenticate : true,
    parent: 'base',
    url:'/warehouses',
    views: {
      mainContainer: {
        controller : 'WarehousesController',
        controllerAs: 'vm',
        templateUrl: 'assets/views/warehouses/warehouses.html'
      }
    }
  })
  .state('inventory', {
    authenticate : true,
    parent: 'base',
    url:'/inventory',
    views: {
      mainContainer: {
        controller : 'InventoryController',
        controllerAs: 'vm',
        templateUrl: 'assets/views/inventory/inventory.html'
      }
    }
  })
  .state('uom', {
    authenticate : true,
    parent: 'base',
    url:'/uom',
    views: {
      mainContainer: {
        controller : 'UOMController',
        controllerAs: 'vm',
        templateUrl: 'assets/views/inventory/uom.html'
      }
    }
  })
  .state('transactions', {
    authenticate : true,
    parent: 'base',
    url:'/transactions',
    views: {
      mainContainer: {
        controller : 'TransactionsController',
        controllerAs: 'vm',
        templateUrl: 'assets/views/transactions/transactions.html'
      }
    }
  })
  .state('transactions-purchase', {
    authenticate : true,
    parent: 'base',
    url:'/transactions/purchase',
    views: {
      mainContainer: {
        controller : 'PurchaseController',
        controllerAs: 'vm',
        templateUrl: 'assets/views/transactions/purchase.html'
      }
    }
  })
  .state('transactions-sale', {
    authenticate : true,
    parent: 'base',
    url:'/transactions/sale',
    views: {
      mainContainer: {
        controller : 'SaleController',
        controllerAs: 'vm',
        templateUrl: 'assets/views/transactions/sale.html'
      }
    }
  })
  .state('purchases', {
    authenticate : true,
    parent: 'base',
    url:'/purchases',
    views: {
      mainContainer: {
        controller : 'PurchasesController',
        controllerAs: 'vm',
        templateUrl: 'assets/views/purchases/purchases.html'
      }
    }
  })
  .state('clients', {
    authenticate : true,
    parent: 'base',
    url:'/clients',
    views: {
      mainContainer: {
        controller : 'ClientsController',
        controllerAs: 'vm',
        templateUrl: 'assets/views/clients/clients.html'
      }
    }
  })
  .state('clients.detail', {
    authenticate : true,
    parent: 'base',
    url:'/clients/:clientId',
    views: {
      mainContainer: {
        controller : 'ClientsDetailController',
        controllerAs: 'vm',
        templateUrl: 'assets/views/clients/clients-detail.html'
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
      mainContainer: {
        controller : 'SettingsController',
        controllerAs: 'vm',
        templateUrl: 'assets/views/settings/settings.html'
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
      mainContainer: {
        controller : 'UsersController',
        controllerAs: 'vm',
        templateUrl: 'assets/views/users/users.html'
      }
    }
  });
}

function run(editableOptions) {
  editableOptions.theme = 'bs3';
}

configure.$inject = [
  '$httpProvider',
  '$stateProvider',
  '$translateProvider',
  '$urlRouterProvider',
  'NotificationProvider',
];
