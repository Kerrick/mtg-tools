import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    gatherer(printing) {
      Ember.Logger.log('GATHERER ACTION');
      window.open(`http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=${printing.multiverseid}`);
    }
  }
});
