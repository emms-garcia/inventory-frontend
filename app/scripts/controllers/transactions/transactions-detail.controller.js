export default class TransactionsDetailController {
  constructor($state, transactionsservice) {
    this.$state = $state;
    this.transactionsservice = transactionsservice;

    this.activate();

    this.$inject = ['$state', 'transactionsservice'];
  }

  activate() {
    console.log('TransactionsDetailController activated.');
    this.transactionsservice.getTransactionDetail(this.$state.params.transactionID).then((data) => {
      if(data) {
        this.transaction = data;
      }
    });
  }
}
