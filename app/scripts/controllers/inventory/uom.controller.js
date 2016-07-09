export default class UOMController {
  constructor($translate, $uibModal, productservice, utilsservice) {
    this.$translate = $translate;
    this.$uibModal = $uibModal;
    this.productservice = productservice;
    this.utilsservice = utilsservice;

    this.uoms = {
      actions: [{
        callback: (uom) => {
          this.deleteUOMs([uom]);
        },
        name: $translate.instant('DELETE_UOM'),
      }],
      bulkActions: [{
        callback: (uoms) => {
          this.deleteUOMs(uoms);
        },
        name: $translate.instant('DELETE_SELECTED_UOMS'),
      }],
      columns: [
        {
          name: $translate.instant('ID'),
          property: 'id',
        },
        {
          edit: (uom, key, value) => {
            return this.updateUOMData(uom, key, value);
          },
          name: $translate.instant('NAME'),
          property: 'name',
        },
        {
          edit: (uom, key, value) => {
            return this.updateUOMData(uom, key, value);
          },
          name: $translate.instant('DESCRIPTION'),
          property: 'description',
          type: 'textarea',
        },
        {
          edit: (uom, key, value) => {
            return this.updateUOMData(uom, key, value);
          },
          name: $translate.instant('SHORT_NAME'),
          property: 'short_name',
        },
      ],
      data: [],
      meta: {},
      requestMore: (next) => {
        this.getUOMs(next);
      },
    };

    this.activate();

    this.$inject = [
      '$translate',
      '$uibModal',
      'productservice',
      'utilsservice'
    ];
  }

  getUOMs(next) {
    this.productservice.getUOMList(next).then((data) => {
      if(data) {
        if(next) {
          this.uoms.data = this.uoms.data.concat(data.objects);
        } else {
          this.uoms.data = data.objects;
        }
        this.uoms.meta = data.meta;
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

  deleteUOMs(uoms) {
    const data = uoms.map((uom) => {
      return uom.resource_uri;
    });
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
