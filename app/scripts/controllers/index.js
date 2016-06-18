import angular from 'angular';

/* clients */
import CreateClientModalController from './clients/modals/create-client.controller.js';
import ClientsDetailController from './clients/clients-detail.controller.js';
import ClientsController from './clients/clients.controller.js';
/* common */
import ConfirmationDialogModalController from './common/modals/confirmation-dialog.controller.js';
import HeaderController from './common/header.controller.js';
import LoginController from './common/login.controller.js';
import SidebarController from './common/sidebar.controller.js';
import SignUpController from './common/signup.controller.js';
/* dashboard */
import DashboardController from './dashboard/dashboard.controller.js';
/* inventory */
import ProductGroupCardController from './inventory/directives/product-group-card.controller.js';
import CreateProductGroupModalController from './inventory/modals/create-product-group.controller.js';
import CreateProductModalController from './inventory/modals/create-product.controller.js';
import EditProductModalController from './inventory/modals/edit-product.controller.js';
import ImportProductsModalController from './inventory/modals/import-products.controller.js';
import InventoryController from './inventory/inventory.controller.js';
/* purchases */
import PurchasesController from './purchases/purchases.controller.js';
/* sales */
import SalesController from './sales/sales.controller.js';
/* settings */
import SettingsController from './settings/settings.controller.js';
/* users */
import CreateUserModalController from './users/modals/create-user.controller.js';
import EditPasswordModalController from './users/modals/edit-password.controller.js';
import UsersController from './users/users.controller.js';
/* warehouses */
import WarehousesController from './warehouses/warehouses.controller';

export default angular.module('inventoryApp.controllers', [])
  .controller('CreateClientModalController', CreateClientModalController)
  .controller('ClientsDetailController', ClientsDetailController)
  .controller('ClientsController', ClientsController)
  .controller('ConfirmationDialogModalController', ConfirmationDialogModalController)
  .controller('HeaderController', HeaderController)
  .controller('LoginController', LoginController)
  .controller('SidebarController', SidebarController)
  .controller('SignUpController', SignUpController)
  .controller('DashboardController', DashboardController)
  .controller('ProductGroupCardController', ProductGroupCardController)
  .controller('CreateProductGroupModalController', CreateProductGroupModalController)
  .controller('CreateProductModalController', CreateProductModalController)
  .controller('EditProductModalController', EditProductModalController)
  .controller('ImportProductsModalController', ImportProductsModalController)
  .controller('InventoryController', InventoryController)
  .controller('PurchasesController', PurchasesController)
  .controller('SalesController', SalesController)
  .controller('SettingsController', SettingsController)
  .controller('CreateUserModalController', CreateUserModalController)
  .controller('EditPasswordModalController', EditPasswordModalController)
  .controller('UsersController', UsersController)
  .controller('WarehousesController', WarehousesController);
