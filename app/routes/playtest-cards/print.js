import Ember from 'ember';

export default Ember.Route.extend({
  decklist: Ember.inject.service(),
  activate() {
    // This page is pretty useless if they haven't given us a decklist.
    if (Ember.isBlank(this.get('decklist.raw'))) {
      this.replaceWith('playtest-cards.index');
    }
  }
});
