import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    toggleIsSidenavOpen() {
      this.toggleProperty('controller.isSidenavOpen');
    }
  }
});
