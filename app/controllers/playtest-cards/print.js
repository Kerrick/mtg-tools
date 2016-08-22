import Ember from 'ember';
import deckParser from 'mtg-tools/utils/deck-parser';
import rangy from 'rangy';

export default Ember.Controller.extend({
  mtg: Ember.inject.service(),
  playtestCards: Ember.inject.controller(),
  showBasicLands: true,
  mtgJsonCards: Ember.computed('playtestCards.decklist', function() {
    const decklist = deckParser(this.get('playtestCards.decklist'));
    return decklist.cards.concat(decklist.sideboard).map(card => {
      return {
        count: card.number,
        name: card.name,
        printings: this.get('mtg').cardsNamed(card.name)
      };
    });
  }),
  desiredCards: Ember.computed('mtgJsonCards.[]', function() {
    return this.get('mtgJsonCards').reject(card => Ember.isEmpty(card.printings));
  }),
  desiredCardsWithoutBasicLands: Ember.computed('desiredCards', function() {
    return this.get('desiredCards').reject(card => {
      return card.printings[0].types.contains('Land') &&
        card.printings[0].supertypes &&
        card.printings[0].supertypes.contains('Basic')
      ;
    });
  }),
  problemCards: Ember.computed('mtgJsonCards.[]', function() {
    return this.get('mtgJsonCards').filter(card => Ember.isEmpty(card.printings));
  }),
  /**
   * Array of Objects with properties card (the card object), and text (the
   * user-input for manually fixing the text layout for print).
   */
  manualTextFixes: [],
  fixText(card, text) {
      const manualTextFixes = this.get('manualTextFixes');
      const override = this.get('manualTextFixes').findBy('card', card);
      if (override) {
        Ember.set(override, 'text', text);
      }
      else {
        manualTextFixes.addObject({ card, text });
      }
  },
  actions: {
    textEdited(card, event) {
      this.fixText(card, event.target.innerHTML);
      // TODO: Restore cursor position. Hard to do with contenteditable.
    }
  }
});
