export default class TransactionsController {
  constructor(transactionsservice) {
    this.transactionsservice = transactionsservice;

    this.activate();
    this.$inject = ['transactionsservice'];
  }

  activate() {
    console.log('TransactionsController activated.');
    this.transactionsHistory = [];

    this.transactionsservice.getTransactionList().then((data) => {
      this.transactionsHistory = data;
    });
  }
}
