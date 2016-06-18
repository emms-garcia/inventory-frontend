export default class ConfirmationDialogModalController {
  constructor($translate, $uibModalInstance, config) {
    this.bodyMsg = config.bodyMsg || $translate.instant('CONFIRMATION_BODY');
    this.cancel = $uibModalInstance.dismiss;
    this.cancelBtnMsg = config.cancelBtnMsg || $translate.instant('CONFIRMATION_CANCEL');
    this.confirm = $uibModalInstance.close;
    this.confirmBtnMsg = config.confirmBtnMsg || $translate.instant('CONFIRMATION_CONFIRM');
    this.titleMsg = config.titleMsg || $translate.instant('CONFIRMATION_TITLE');

    this.$inject = ['$translate', '$uibModalInstance', 'config'];
  }
}
