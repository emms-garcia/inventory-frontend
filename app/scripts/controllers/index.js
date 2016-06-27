import angular from 'angular';

/* clients */
import CreateClientModalController from './clients/modals/create-client.controller';
import ClientsDetailController from './clients/clients-detail.controller';
import ClientsController from './clients/clients.controller';
/* common */
import BaseController from './common/base.controller';
import ConfirmationDialogModalController from './common/modals/confirmation-dialog.controller';
import HeaderController from './common/header.controller';
import LoginController from './common/login.controller';
import SignUpController from './common/signup.controller';
/* dashboard */
import DashboardController from './dashboard/dashboard.controller';
/* inventory */
import ProductGroupCardController from './inventory/directives/product-group-card.controller';
import CreateProductGroupModalController from './inventory/modals/create-product-group.controller';
import CreateProductModalController from './inventory/modals/create-product.controller';
import CreateUOMModalController from './inventory/modals/create-uom.controller';
import EditProductModalController from './inventory/modals/edit-product.controller';
import ImportProductsModalController from './inventory/modals/import-products.controller';
import InventoryController from './inventory/inventory.controller';
/* transactions */
import TransactionsController from './transactions/transactions.controller';
import AddProductModalController from './transactions/modals/add-product.controller';
/* settings */
import SettingsController from './settings/settings.controller';
/* users */
import CreateUserModalController from './users/modals/create-user.controller';
import EditPasswordModalController from './users/modals/edit-password.controller';
import UsersController from './users/users.controller';
/* warehouses */
import WarehousesController from './warehouses/warehouses.controller';
import CreateWarehouseModalController from './warehouses/modals/create-warehouse.controller';

export default angular.module('inventoryApp.controllers', [])
  .controller('CreateClientModalController', CreateClientModalController)
  .controller('ClientsDetailController', ClientsDetailController)
  .controller('ClientsController', ClientsController)
  .controller('BaseController', BaseController)
  .controller('ConfirmationDialogModalController', ConfirmationDialogModalController)
  .controller('HeaderController', HeaderController)
  .controller('LoginController', LoginController)
  .controller('SignUpController', SignUpController)
  .controller('DashboardController', DashboardController)
  .controller('ProductGroupCardController', ProductGroupCardController)
  .controller('CreateProductGroupModalController', CreateProductGroupModalController)
  .controller('CreateProductModalController', CreateProductModalController)
  .controller('CreateUOMModalController', CreateUOMModalController)
  .controller('EditProductModalController', EditProductModalController)
  .controller('ImportProductsModalController', ImportProductsModalController)
  .controller('InventoryController', InventoryController)
  .controller('TransactionsController', TransactionsController)
  .controller('AddProductModalController', AddProductModalController)
  .controller('SettingsController', SettingsController)
  .controller('CreateUserModalController', CreateUserModalController)
  .controller('EditPasswordModalController', EditPasswordModalController)
  .controller('UsersController', UsersController)
  .controller('WarehousesController', WarehousesController)
  .controller('CreateWarehouseModalController', CreateWarehouseModalController);
