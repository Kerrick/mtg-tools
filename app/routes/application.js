import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    deck: {
      replace: true
    }
  },
  actions: {
    toggleIsSidenavOpen() {
      this.toggleProperty('controller.isSidenavOpen');
    }
  }
});
