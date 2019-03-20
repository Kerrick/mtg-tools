import { readOnly } from '@ember/object/computed';
import { next } from '@ember/runloop';
import Evented from '@ember/object/evented';
import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { parse } from 'mtg-tools/utils/deck-parser';
import { preferredPrinting } from 'mtg-tools/utils/opinions';

export default Service.extend(Evented, {
  mtg: service(),
  raw: computed('_raw', {
    get() {
      return this.get('_raw');
    },
    set(key, value) {
      this.set('_raw', value);
      next(() => this.trigger('rawUpdated', value));
      return value;
    }
  }),
  _raw: '',
  toCard(card) {
    return {
      count: card.number,
      name: card.name,
      printings: this.get('mtg')
        .cardsNamed(card.name)
        .sort(preferredPrinting)
    };
  },
  decklist: computed('raw', function() {
    return parse(this.get('raw'));
  }),
  mtgJsonCards: computed('mtgJsonMaindeckCards', 'mtgJsonSideboardCards', function() {
    return this.get('mtgJsonMaindeckCards').concat(this.get('mtgJsonSideboardCards'));
  }),
  mtgJsonMaindeckCards: computed('decklist', function() {
    return this.get('decklist.cards')
      .map(x => this.toCard(x))
      .reject(card => isEmpty(card.printings));
  }),
  mtgJsonSideboardCards: computed('decklist', function() {
    return this.get('decklist.sideboard')
      .map(x => this.toCard(x))
      .reject(card => isEmpty(card.printings));
  }),
  desiredCards: readOnly('mtgJsonCards'),
  desiredCardsWithoutBasicLands: computed('desiredCards', function() {
    return this.get('desiredCards').reject(card => {
      return (
        card.printings[0].types.includes('Land') &&
        card.printings[0].supertypes &&
        card.printings[0].supertypes.includes('Basic')
      );
    });
  }),
  problemCards: computed('mtgJsonCards.[]', function() {
    const decklist = this.get('decklist');
    return decklist.cards
      .concat(decklist.sideboard)
      .map(x => this.toCard(x))
      .filter(card => isEmpty(card.printings));
  })
});
