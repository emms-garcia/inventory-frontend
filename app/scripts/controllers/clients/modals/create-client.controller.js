export default class CreateClientModalController {
  constructor($uibModalInstance, clientsservice) {
    this.$uibModalInstance = $uibModalInstance;
    this.clientsservice = clientsservice;

    this.address = null;
    this.cellphone = null;
    this.company = null;
    this.email = null;
    this.name = null;
    this.phone = null;
    this.rfc = null;

    this.activate();

    this.$inject = ['$uibModalInstance', 'clientsservice'];
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  create() {
    this.clientsservice.createClient({
      address: this.address,
      cellphone: this.cellphone,
      company: this.company,
      email: this.email,
      latitude: 0.0,
      longitude: 0.0,
      name: this.name,
      phone: this.phone,
      rfc: this.rfc
    }).then((data) => {
      if (data) {
        this.$uibModalInstance.close();
      }
    });
  }

  activate() {
    console.log('CreateClientModalController activated.');
    navigator.geolocation.getCurrentPosition(function (position) {});
  }
}
