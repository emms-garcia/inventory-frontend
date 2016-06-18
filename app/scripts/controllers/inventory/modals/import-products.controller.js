export default class ImportProductsModalController {
  constructor($uibModalInstance, $timeout, productservice) {
    this.$uibModalInstance = $uibModalInstance;
    this.$timeout = $timeout;
    this.productservice = productservice;

    this.errFile = null;
    this.errorMsg = null;
    this.f = null;

    this.activate();

    this.$inject = ['$uibModalInstance', '$timeout', 'productservice'];
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  importProducts() {
    if(this.f) {
      this.f.upload = this.productservice.importProducts(this.f);
      this.f.upload.then((response) => {
        this.$timeout(() => {
          this.f.result = response.data;
          this.$uibModalInstance.close();
        });
      }, (response) => {
          if (response.status > 0) {
            this.errorMsg = response.status + ': ' + response.data;
          }
      }, (evt) => {
        this.f.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
  }

  uploadFiles (file, errFiles) {
    this.f = file;
    this.errFile = errFiles && errFiles[0];
  }

  activate() {
    console.log('ImportProductsModalController activated.');
  }
}
