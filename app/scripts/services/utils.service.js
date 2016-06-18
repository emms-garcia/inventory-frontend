export default class utilsservice {
  constructor($translate, $uibModal, Notification) {
    this.$translate = $translate;
    this.$uibModal = $uibModal;
    this.Notification = Notification;

    this.$inject = ['$translate', '$uibModal', 'Notification'];
  }

  translate(tag) {
    return this.$translate.instant(tag);
  }

  notifySuccess(message) {
    this.Notification.success(message);
  }

  notifyError(message) {
    this.Notification.error(message);
  }

  notifyInformation(message) {
    this.Notification.info(message);
  }

  notifyWarning(message) {
    this.Notification.warning(message);
  }

  confirmationDialog(successCallback, errorCallback, config) {
    config = config ? config : {};
    const modalInstance = this.$uibModal.open({
      animation: config.animation || true,
      templateUrl: 'views/commons/confirmation-dialog.html',
      controller: 'ConfirmationDialogModalController as vm',
      size: config.size || 'md',
      resolve: {
        config: () => {
          return config;
        }
      }
    });
    modalInstance.result.then(successCallback, errorCallback);
  }
}
