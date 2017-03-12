import Ember from 'ember';

const { computed, isBlank } = Ember;

export default Ember.Controller.extend({
  decklist: Ember.inject.service(),
  application: Ember.inject.controller(),
  isInEditView: true,
  determineEditState: Ember.on('init', function() {
    if (!isBlank(this.get('application.deck'))) {
      this.set('isInEditView', false);
    }
  })
});
