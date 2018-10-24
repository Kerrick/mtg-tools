import { readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  decklist: service(),
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
  sideboard: readOnly('decklist.mtgJsonSideboardCards')
});
