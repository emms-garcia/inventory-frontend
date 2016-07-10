class TransactionWizardController {
  constructor($translate, $uibModal, clientsservice, productservice) {
    this.$translate = $translate;
    this.$uibModal = $uibModal;
    this.clientsservice = clientsservice;
    this.productservice = productservice;

    this.activate();

    this.clients = [];
    this.currentTab = 3;
    this.tabs = [
      $translate.instant('TRANSACTION_INFORMATION'),
      $translate.instant('TRANSACTION_CART'),
      $translate.instant('TRANSACTION_BILLING'),
      $translate.instant('TRANSACTION_PREVIEW'),
    ];

    this.selectedClient = null;
    this.taxes = [];
    this.transaction = {
      client: {
        name: 'Test Company',
        address: 'Something something #123 Something something',
        rfc: 'XXXX122121'
      },
      comment: 'Test sale',
      date: new Date(),
      location: 'Monterrey, Nuevo León',
      name: 'Test',
      time: new Date(),
      type: this.type || 'sale',
      voucher: {
        "products":[{"created_at":1468171737,"description":"5000","id":17,"name":"NORTHERN BREWER","owner_id":null,"price":1,"price_per_unit":0.4,"quantity":0,"resource_uri":"/v1/inventory/products/17/","uom":{"created_at":"2016-07-10T17:12:11.808987","description":"","id":6,"name":"Gramo","owner_id":null,"resource_uri":"/v1/inventory/uoms/6/","short_name":"GR","updated_at":"2016-07-10T17:12:11.808741"},"updated_at":1468171737,"$$hashKey":"object:168","transactionPrice":0.4,"transactionQuantity":100},{"created_at":1468171694,"description":"5000","id":14,"name":"FUGGLE","owner_id":null,"price":1,"price_per_unit":0.65,"quantity":0,"resource_uri":"/v1/inventory/products/14/","uom":{"created_at":"2016-07-10T17:12:11.808987","description":"","id":6,"name":"Gramo","owner_id":null,"resource_uri":"/v1/inventory/uoms/6/","short_name":"GR","updated_at":"2016-07-10T17:12:11.808741"},"updated_at":1468171694,"$$hashKey":"object:208","transactionPrice":0.65,"transactionQuantity":200},{"created_at":1468171652,"description":"5000","id":12,"name":"MOZAIC","owner_id":null,"price":1,"price_per_unit":1.06,"quantity":0,"resource_uri":"/v1/inventory/products/12/","uom":{"created_at":"2016-07-10T17:12:11.808987","description":"","id":6,"name":"Gramo","owner_id":null,"resource_uri":"/v1/inventory/uoms/6/","short_name":"GR","updated_at":"2016-07-10T17:12:11.808741"},"updated_at":1468171978,"$$hashKey":"object:247","transactionPrice":1.06,"transactionQuantity":300},{"created_at":1468171455,"description":"22.68","id":8,"name":"MALTA TRIGO CLARA","owner_id":null,"price":1,"price_per_unit":52.07,"quantity":0,"resource_uri":"/v1/inventory/products/8/","uom":{"created_at":"2016-07-10T17:11:51.131177","description":"","id":5,"name":"Kilogramo","owner_id":null,"resource_uri":"/v1/inventory/uoms/5/","short_name":"KG","updated_at":"2016-07-10T17:11:51.130991"},"updated_at":1468171455,"$$hashKey":"object:227","transactionPrice":52.07,"transactionQuantity":0}],
        "taxes":[{"description":"IVA","id":1,"name":"IVA 16%","percent":0.16,"resource_uri":"/v1/inventory/taxes/1/","$$hashKey":"object:168","selected":true}]}
    };

    this.$inject = ['$translate', '$uibModal', 'clientsservice', 'productservice'];
  }

  calculateSubTotal() {
    let subTotal = 0.0;
    for(const product of this.transaction.voucher.products) {
      subTotal += (product.transactionPrice * product.transactionQuantity);
    }
    return subTotal;
  }

  calculateTax() {
    const subTotal = this.calculateSubTotal();
    let taxSum = 0.0;
    for(const tax of this.taxes) {
      if(tax.selected) {
        taxSum += subTotal * tax.percent;
      }
    }
    return taxSum;
  }

  calculateTotal() {
    const subtotal = this.calculateSubTotal();
    const total = subtotal + this.calculateTax();
    this.transaction.voucher.subtotal = subtotal;
    this.transaction.voucher.total = total;
    return total;
  }

  nextTab() {
    this.currentTab += 1;
    if (this.currentTab > 3) {
      this.currentTab = 3;
    }
  }

  onClientSelected() {
    if(this.selectedClient) {
      this.transaction.client = {
        client_id: this.selectedClient.id,
        name: this.selectedClient.name,
        company: this.selectedClient.company,
        email: this.selectedClient.email,
        rfc: this.selectedClient.rfc,
        phone: this.selectedClient.phone,
        cellphone: this.selectedClient.cellphone,
        address: this.selectedClient.address,
        comment: this.selectedClient.comment,
      };
    } else {
      delete this.transaction.client.client_id;
    }
  }

  openAddProductModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'assets/views/transactions/modals/add-product.html',
      controller: 'AddProductModalController as vm',
      size: 'md'
    });

    modalInstance.result.then((data) => {
      data.transactionPrice = data.price_per_unit;
      data.transactionQuantity = 0;
      this.transaction.voucher.products.push(data);
    });
  }

  previousTab() {
    this.currentTab -= 1;
    if (this.currentTab < 0) {
      this.currentTab = 0;
    }
  }

  removeProduct(index) {
    this.transaction.voucher.products.splice(index, 1);
  }

  taxSelected() {
    this.transaction.voucher.taxes = [];
    this.taxes.forEach((tax) => {
      if(tax.selected) {
        this.transaction.voucher.taxes.push(tax);
      }
    });
  }

  activate() {
    console.log('TransactionWizardController activated.');
    this.clientsservice.getClientList().then((data) => {
      if(data) {
        this.clients = data.objects;
      }
    });
    this.productservice.getTaxList().then((data) => {
      this.taxes = data || [];
    });
  }
}

export default function transactionWizard() {
  return {
    controller: TransactionWizardController,
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'E',
    scope: {
      type: '='
    },
    templateUrl: 'assets/views/transactions/directives/transaction-wizard.html'
  };
}
