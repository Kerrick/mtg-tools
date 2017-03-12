import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  decklist: Ember.inject.service(),
  lands: computed('decklist.mtgJsonMaindeckCards.[]', function() {
    return this.get('decklist.mtgJsonMaindeckCards').filter(card => {
      return card.printings[0].types.includes('Land');
    });
  }),
  creatures: computed('decklist.mtgJsonMaindeckCards.[]', function() {
    return this.get('decklist.mtgJsonMaindeckCards').filter(card => {
      return !card.printings[0].types.includes('Land') && card.printings[0].types.includes('Creature');
    });
  }),
  spells: computed('decklist.mtgJsonMaindeckCards.[]', 'lands.[]', 'creatures.[]', function() {
    return this.get('decklist.mtgJsonMaindeckCards').filter(card => {
      return !card.printings[0].types.includes('Land') && !card.printings[0].types.includes('Creature');
    });
  }),
  sideboard: computed.readOnly('decklist.mtgJsonSideboardCards')
});
