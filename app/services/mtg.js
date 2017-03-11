import Ember from 'ember';

const firstMatch = (allSets, test) => {
  const allSetCodes = Object.keys(allSets).reverse();
  let foundCard = null;
  // For performance, we want to break out of the loop as soon as a match is found.
  // So to do this, we're doing an old-fashioned for loop here.
  for (let i = 0; i < allSetCodes.length; i += 1) {
    if (foundCard) { break; }
    let cards = allSets[allSetCodes[i]].cards;
    for (let j = 0; j < cards.length; j += 1) {
      if (test(cards[j])) {
        foundCard = cards[j];
        break;
      }
    }
  }
  return foundCard;
};

export default Ember.Service.extend({
  allSets: Ember.computed(function() {
    return Ember.ObjectProxy.extend(Ember.PromiseProxyMixin).create({
      promise: Ember.RSVP.resolve(Ember.$.ajax({
        url: 'https://mtgjson.com/json/AllSets-x.jsonp',
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
  },
  nameForMultiverseid(id) {
    return firstMatch(this.get('allSets.content'), card => card.multiverseid === id).name;
  }
});
