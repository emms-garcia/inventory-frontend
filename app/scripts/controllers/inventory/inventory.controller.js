export default class InventoryController {
  constructor($uibModal, $translate, productservice, userservice, utilsservice) {
    this.$uibModal = $uibModal;
    this.$translate = $translate;
    this.productservice = productservice;
    this.userservice = userservice;
    this.utilsservice = utilsservice;

    this.currentUser = userservice.currentUser;
    this.productGroups = [];
    this.products = [];
    this.queryProductGroups = '';
    this.queryProducts = '';
    this.allProductsSelected = false;

    this.activate();

    this.$inject = [
      '$uibModal',
      '$translate',
      'productservice',
      'userservice',
      'utilsservice'
    ];
  }

  getProducts() {
    this.productservice.getProductList().then((data) => {
      if(data) {
        this.products = data;
      }
    });
  }

  getProductGroups() {
    this.productservice.getProductGroupList().then((data) => {
      if(data) {
        this.productGroups = data;
      }
    })
  }

  openCreateProductGroupModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'views/inventory/modals/create-product-group.html',
      controller: 'CreateProductGroupModalController as vm',
      size: 'lg',
      resolve: {
        products: () => {
          return this.products;
        }
      }
    });
    modalInstance.result.then(() => {
      this.getProductGroups();
    });
  }

  openCreateProductModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'views/inventory/modals/create-product.html',
      controller: 'CreateProductModalController as vm',
      size: 'lg'
    });

    modalInstance.result.then(() => {
      this.getProducts();
    });
  }

  openEditProductModal(product) {
    this.$uibModal.open({
      animation: true,
      templateUrl: 'views/inventory/modals/edit-product.html',
      controller: 'EditProductModalController as vm',
      size: 'md',
      resolve: {
        product: () => {
          return product;
        }
      }
    });
  }

  deleteSelectedProductGroups() {
    const data = [];
    this.productGroups.forEach((group) => {
      if(group.selected) {
        data.push(group.resource_uri);
      }
    });

    if(data.length > 0) {
      this.utilsservice.confirmationDialog(() => {
        this.productservice.deleteProductGroups(data).then(() => {
          this.getProductGroups();
        });
      });
    }
  }

  deleteSelectedProducts() {
    const data = [];
    this.products.forEach((product) => {
      if(product.selected) {
        data.push(product.resource_uri);
      }
    })

    if(data.length > 0) {
      this.utilsservice.confirmationDialog(() => {
        this.productservice.deleteProducts(data).then(() => {
          this.getProducts();
        });
      });
    }
  }

  importProductsModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'views/inventory/modals/import-products.html',
      controller: 'ImportProductsModalController as vm',
      size: 'lg'
    });
    modalInstance.result.then(() => {
      this.getProducts();
    });
  }

  toggleAllProducts() {
    this.products.forEach((product) => {
      product.selected = this.allProductsSelected;
    });
  }

  activate() {
    console.log('InventoryController activated.');
    this.getProductGroups();
    this.getProducts();
  }
}
