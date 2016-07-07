export default class BaseController {
  constructor($state, $translate, userservice, utilsservice) {
    this.$state = $state;
    this.$translate = $translate;
    this.userservice = userservice;
    this.utilsservice = utilsservice;

    this.currentUser = this.userservice.currentUser;
    this.menuItems = [
      { children: [], collapsed: false, iconClass: 'fa-desktop', label: $translate.instant('DASHBOARD'), 'uiSref': 'dashboard' },
      {
        children: [
          { iconClass: 'fa-cubes', label: $translate.instant('INVENTORY_LIST'), uiSref: 'inventory' },
          { iconClass: 'fa-sort-numeric-asc', label: $translate.instant('UOM_LIST'), uiSref: 'uom' },
        ],
        collapsed: false,
        iconClass: 'fa-list',
        label: $translate.instant('INVENTORY'),
        uiSref: 'inventory'
      },
      {
        children: [
          { iconClass: 'fa-history', label: $translate.instant('TRANSACTIONS_HISTORY'), uiSref: 'transactions' },
          { iconClass: 'fa-shopping-cart', label: $translate.instant('PURCHASE'), uiSref: 'transactions-purchase' },
          { iconClass: 'fa-truck', label: $translate.instant('SALE'), uiSref: 'transactions-sale' },
        ],
        collapsed: false,
        iconClass: 'fa-money',
        label: $translate.instant('TRANSACTIONS'),
        uiSref: 'transactions',
      },
      { children: [], collapsed: false, iconClass: 'fa-users', label: $translate.instant('CLIENTS'), uiSref: 'clients' },
    ];

    this.activate();

    this.$inject = ['$state', '$translate', 'userservice', 'utilsservice'];
  }

  isMenuItemActive(item) {
    let a = false;
    if(item.children) {
      item.children.forEach((child) => {
        if(this.$state.current.name === child.uiSref) {
          a = true;
        }
      });
    }
    return a || this.$state.current.name === item.uiSref;
  }

  toggleCollapse(item) {
    item.collapse = !item.collapse;
  }

  logOut() {
    const config = {
      bodyMsg: this.$translate.instant('LOGOUT_MODAL_BODY'),
      titleMsg: this.$translate.instant('LOGOUT_MODAL_TITLE'),
    };
    this.utilsservice.confirmationDialog(() => {
      this.userservice.logOut().then((loggedOut) => {
        if(loggedOut) {
          this.$state.go('login');
        }
      });
    }, null, config);
  }

  activate() {
    console.log('BaseController activated.');
  }
}
