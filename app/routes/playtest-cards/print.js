import Ember from 'ember';

export default Ember.Route.extend({
  activate() {
    // This page is pretty useless if they haven't given us a decklist.
    if (Ember.isBlank(this.controllerFor('playtest-cards').get('decklist'))) {
      this.replaceWith('playtest-cards.index');
    }
  }
});
