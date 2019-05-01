import { readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

const isType = (card, type) => card.printings[0].types.includes(type);

export default Component.extend({
  tagName: '',
  decklist: service(),
  maindeck: computed('decklist.mtgJsonMaindeckCards.[]', function() {
    return Object.entries(this.get('decklist.mtgJsonMaindeckCards').reduce((grouped, card) => {
      if (isType(card, 'Land')) {
        // This should catch Land Creatures.
        grouped.Lands.push(card);
      }
      else if (isType(card, 'Planeswalker')) {
        grouped.Planeswalkers.push(card);
      }
      else if (isType(card, 'Creature')) {
        // This should catch Artifact Creatures and Enchantment Creatures.
        grouped.Creatures.push(card);
      }
      else if (isType(card, 'Artifact')) {
        // This should catch Artifact Enchantments
        grouped.Artifacts.push(card);
      }
      else if (isType(card, 'Enchantment')) {
        grouped.Enchantments.push(card);
      }
      else {
        grouped.Spells.push(card);
      }
      return grouped;
    }, {
      Creatures: [],
      Planeswalkers: [],
      Artifacts: [],
      Enchantments: [],
      Spells: [],
      Lands: [],
    })).map(([key, value]) => ({ type: key, cards: value }));
  }),
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
