import { copy } from '@ember/object/internals';
import { readOnly } from '@ember/object/computed';
import $ from 'jquery';
import { resolve } from 'rsvp';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import ObjectProxy from '@ember/object/proxy';
import { computed } from '@ember/object';
import Service from '@ember/service';

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

export default Service.extend({
  allSets: computed(function() {
    return ObjectProxy.extend(PromiseProxyMixin).create({
      promise: resolve($.ajax({
        url: 'https://mtgjson.com/json/AllSets-x.jsonp',
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'mtgjsoncallback'
      }))
    });
  }),
  isLoading: readOnly('allSets.isPending'),
  cardsNamed(name) {
    const cards = [];
    Object.keys(this.get('allSets.content')).filter(setCode => {
      const found = this.get(`allSets.content.${setCode}.cards`).find(card => card.name === name);
      if (!found || !found.multiverseid) { return false; }
      const card = copy(found, true);
      card.set = copy(this.get(`allSets.content.${setCode}`), false);
      delete card.set.cards;
      cards.push(card);
      return true;
    });
    return cards;
  },
  nameForMultiverseid(id) {
    const found = firstMatch(this.get('allSets.content'), card => card.multiverseid === id)
    return found ? found.name : null;
  }
});
