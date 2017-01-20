import Ember from 'ember';
import deckParser from 'mtg-tools/utils/deck-parser';

const { inject, computed, isEmpty } = Ember;

export default Ember.Service.extend({
  mtg: inject.service(),
  raw: '',
  toCard(card) {
      return {
        count: card.number,
        name: card.name,
        printings: this.get('mtg').cardsNamed(card.name)
      };
  },
  decklist: computed('raw', function() {
    return deckParser(this.get('raw'));
  }),
  mtgJsonCards: computed('mtgJsonMaindeckCards', 'mtgJsonSideboardCards', function() {
    return this.get('mtgJsonMaindeckCards')
      .concat(this.get('mtgJsonSideboardCards'))
    ;
  }),
  mtgJsonMaindeckCards: computed('decklist', function() {
    return this.get('decklist.cards')
      .map(x => this.toCard(x))
      .reject(card => isEmpty(card.printings))
    ;
  }),
  mtgJsonSideboardCards: computed('decklist', function() {
    return this.get('decklist.sideboard')
      .map(x => this.toCard(x))
      .reject(card => isEmpty(card.printings))
    ;
  }),
  desiredCards: computed.readOnly('mtgJsonCards'),
  desiredCardsWithoutBasicLands: computed('desiredCards', function() {
    return this.get('desiredCards').reject(card => {
      return card.printings[0].types.contains('Land') &&
        card.printings[0].supertypes &&
        card.printings[0].supertypes.contains('Basic')
        ;
    });
  }),
  problemCards: computed('mtgJsonCards.[]', function() {
    const decklist = this.get('decklist');
    return decklist.cards.concat(decklist.sideboard)
      .map(x => this.toCard(x))
      .filter(card => isEmpty(card.printings))
    ;
  })
});
