import Ember from 'ember';
import deckParser from 'mtg-tools/utils/deck-parser';

export default Ember.Controller.extend({
  mtg: Ember.inject.service(),
  playtestCards: Ember.inject.controller(),
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
  problemCards: Ember.computed('mtgJsonCards.[]', function() {
    return this.get('mtgJsonCards').filter(card => Ember.isEmpty(card.printings));
  })
});
