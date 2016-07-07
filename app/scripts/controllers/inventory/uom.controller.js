export default class UOMController {
  constructor($translate, $uibModal, productservice, userservice, utilsservice) {
    this.$translate = $translate;
    this.$uibModal = $uibModal;
    this.productservice = productservice;
    this.utilsservice = utilsservice;

    this.allUOMsSelected = false;

    this.currentUser = userservice.currentUser;
    this.uoms = [];

    this.activate();

    this.$inject = [
      '$translate',
      '$uibModal',
      'productservice',
      'userservice',
      'utilsservice'
    ];
  }

  getUOMs() {
    this.productservice.getUOMList().then((data) => {
      if(data) {
        this.uoms = data;
      }
    });
  }

  openCreateUOMModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'assets/views/inventory/modals/create-uom.html',
      controller: 'CreateUOMModalController as vm',
      size: 'md'
    });

    modalInstance.result.then(() => {
      this.getUOMs();
    });
  }

  deleteSelectedUOMs() {
    const data = [];
    this.uoms.forEach((uom) => {
      if(uom.selected) {
        data.push(uom.resource_uri);
      }
    })

    if(data.length > 0) {
      const config = {
        bodyMsg: this.$translate.instant('DELETE_UOMS_MODAL_BODY'),
        titleMsg: this.$translate.instant('DELETE_UOMS_MODAL_TITLE')
      };
      this.utilsservice.confirmationDialog(() => {
        this.productservice.deleteUOMs(data).then(() => {
          this.getUOMs();
        });
      }, null, config);
    }
  }

  updateUOMData(uom, key, value) {
    return this.productservice.updateUOM(uom.id, { [key]: value });
  }

  activate() {
    console.log('UOMController activated.');
    this.getUOMs();
  }
}
