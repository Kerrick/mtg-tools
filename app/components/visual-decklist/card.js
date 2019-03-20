import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  actions: {
    gatherer(printing) {
      Ember.Logger.log('GATHERER ACTION');
      window.open(`http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseId=${printing.multiverseId}`);
    }
  }
});
