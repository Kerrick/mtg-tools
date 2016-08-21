import Ember from 'ember';

export default Ember.Service.extend({
  allSets: Ember.computed(function() {
    return Ember.ObjectProxy.extend(Ember.PromiseProxyMixin).create({
      promise: Ember.RSVP.resolve(Ember.$.ajax({
        url: 'http://mtgjson.com/json/AllSets-x.jsonp',
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'mtgjsoncallback'
      }))
    });
  }),
  isLoading: Ember.computed.readOnly('allSets.isPending'),
  cardsNamed(name) {
    const cards = [];
    Object.keys(this.get('allSets.content')).filter(setCode => {
      const found = this.get(`allSets.content.${setCode}.cards`).find(card => card.name === name);
      if (!found || !found.multiverseid) { return false; }
      const card = Ember.copy(found, true);
      card.set = Ember.copy(this.get(`allSets.content.${setCode}`), false);
      delete card.set.cards;
      cards.push(card);
      return true;
    });
    return cards;
  }
});
