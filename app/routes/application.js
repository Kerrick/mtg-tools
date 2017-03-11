import Ember from 'ember';

export default Ember.Route.extend({
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
