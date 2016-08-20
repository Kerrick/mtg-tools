import Ember from 'ember';

export default Ember.Controller.extend({
  mtg: Ember.inject.service(),
  application: Ember.inject.controller(),
  decklist: '',
  isInPrintView: Ember.computed.equal('application.currentRouteName', 'playtest-cards.print'),
  actions: {
    print() {
      window.print();
    },
    goToPrintView() {
      this.transitionToRoute('playtest-cards.print');
      Ember.Logger.error('Not Implmented');
    }
  }
});
