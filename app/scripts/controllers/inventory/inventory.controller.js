export default class InventoryController {
  constructor($translate, $uibModal, productservice, utilsservice) {
    this.$translate = $translate;
    this.$uibModal = $uibModal;
    this.productservice = productservice;
    this.utilsservice = utilsservice;

    this.allProductsSelected = false;

    this.productGroups = [];
    this.products = [];
    this.queryProductGroups = '';
    this.queryProducts = '';

    this.activate();

    this.$inject = [
      '$translate',
      '$uibModal',
      'productservice',
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
      templateUrl: 'assets/views/inventory/modals/create-product-group.html',
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
      templateUrl: 'assets/views/inventory/modals/create-product.html',
      controller: 'CreateProductModalController as vm',
      size: 'md',
    });

    modalInstance.result.then(() => {
      this.getProducts();
    });
  }

  openEditProductModal(product) {
    this.$uibModal.open({
      animation: true,
      templateUrl: 'assets/views/inventory/modals/edit-product.html',
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
      const config = {
        bodyMsg: this.$translate.instant('DELETE_PRODUCT_GROUPS_MODAL_BODY'),
        titleMsg: this.$translate.instant('DELETE_PRODUCT_GROUPS_MODAL_TITLE')
      };
      this.utilsservice.confirmationDialog(() => {
        this.productservice.deleteProductGroups(data).then(() => {
          this.getProductGroups();
        });
      }, null, config);
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
      const config = {
        bodyMsg: this.$translate.instant('DELETE_PRODUCTS_MODAL_BODY'),
        titleMsg: this.$translate.instant('DELETE_PRODUCTS_MODAL_TITLE')
      };
      this.utilsservice.confirmationDialog(() => {
        this.productservice.deleteProducts(data).then(() => {
          this.getProducts();
        });
      }, null, config);
    }
  }

  importProductsModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'assets/views/inventory/modals/import-products.html',
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

  updateProductData(product, key, value) {
    return this.productservice.updateProduct(product.id, { [key]: value });
  }

  activate() {
    console.log('InventoryController activated.');
    //this.getProductGroups();
    this.getProducts();
  }
}
