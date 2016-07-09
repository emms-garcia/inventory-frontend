export default class InventoryController {
  constructor($filter, $translate, $uibModal, productservice, utilsservice) {
    this.$translate = $translate;
    this.$uibModal = $uibModal;
    this.productservice = productservice;
    this.utilsservice = utilsservice;

    this.products = {
      actions: [{
        callback: (product) => {
          this.deleteProducts([product]);
        },
        name: $translate.instant('DELETE_PRODUCT'),
      }],
      bulkActions: [{
        callback: (products) => {
          this.deleteProducts(products);
        },
        name: $translate.instant('DELETE_SELECTED_PRODUCTS'),
      }],
      columns: [
        {
          name: $translate.instant('ID'),
          property: 'id',
        },
        {
          format: (product) => {
            return $filter('date')(product.created_at * 1000, 'dd/MMM/yyyy hh:mm a');
          },
          name: $translate.instant('CREATED_AT'),
          property: 'created_at',
        },
        {
          edit: (product, key, value) => {
            return this.updateProductData(product, key, value);
          },
          name: $translate.instant('NAME'),
          property: 'name',
        },
        {
          edit: (product, key, value) => {
            return this.updateProductData(product, key, value);
          },
          name: $translate.instant('DESCRIPTION'),
          property: 'description',
          type: 'textarea',
        },
        {
          edit: (product, key, value) => {
            return this.updateProductData(product, key, value);
          },
          format: (product) => {
            return `${product.quantity} ${product.uom.short_name}`;
          },
          name: $translate.instant('QUANTITIES'),
          property: 'quantity',
          type: 'number',
        },
        {
          edit: (product, key, value) => {
            return this.updateProductData(product, key, value);
          },
          name: $translate.instant('PRICE_PER_UNIT'),
          property: 'price_per_unit',
          type: 'number',
        },
      ],
      data: [],
      meta: [],
      requestMore: (next) => {
        this.getProducts(next);
      },
    };

    // this.productGroups = [];
    // this.queryProductGroups = '';
    this.activate();

    this.$inject = [
      '$filter',
      '$translate',
      '$uibModal',
      'productservice',
      'utilsservice'
    ];
  }

  /*
  getProductGroups() {
    this.productservice.getProductGroupList().then((data) => {
      if(data) {
        this.productGroups = data;
      }
    })
  }
  */

  /*
  openCreateProductGroupModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'assets/views/inventory/modals/create-product-group.html',
      controller: 'CreateProductGroupModalController as vm',
      size: 'lg',
      resolve: {
        products: () => {
          return this.products.data;
        }
      }
    });
    modalInstance.result.then(() => {
      this.getProductGroups();
    });
  }
  */

  /*
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
  */

  /*
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
  */

  /*
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
  */

  deleteProducts(products) {
    const data = products.map((product) => {
      return product.resource_uri;
    });

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

  getProducts(next) {
    this.productservice.getProductList(next).then((data) => {
      if(data) {
        if(next) {
          this.products.data = this.products.data.concat(data.objects);
        } else {
          this.products.data = data.objects;
        }
        this.products.meta = data.meta;
      }
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

  updateProductData(product, key, value) {
    return this.productservice.updateProduct(product.id, { [key]: value });
  }

  activate() {
    console.log('InventoryController activated.');
    // this.getProductGroups();
    this.getProducts();
  }
}
