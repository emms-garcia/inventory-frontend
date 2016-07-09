class DataTableController {
  constructor() {
    this.activate();

    this.selectAll = false;

    this.$inject = [];
  }

  callBulkAction(action) {
    const data = this.data.filter((obj) => {
      return obj.selected;
    });
    action.callback(data);
  }

  sortColumn(index) {
    const column = this.columns[index];
  }

  display(obj, column) {
    if('format' in column) {
      return column.format(obj);
    }
    return obj[column.property];
  }

  toggleSelectAll() {
    this.data.forEach((obj) => {
      obj.selected = this.selectAll;
    });
  }

  activate() {
    console.log('DataTableController activated.');
  }
}


export default function dataTable() {
  return {
    controller: DataTableController,
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'E',
    scope: {
      actions: '=',
      bulkActions: '=',
      columns: '=',
      data: '=',
      meta: '=',
      requestMore: '=',
    },
    templateUrl: 'assets/views/commons/directives/data-table.html'
  };
}
