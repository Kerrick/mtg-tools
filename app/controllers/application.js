import Ember from 'ember';
import { encode, decode } from 'mtg-tools/utils/deck-encoder';
import { unparse } from 'mtg-tools/utils/deck-parser';

export default Ember.Controller.extend({
  queryParams: ['deck'],
  deck: '',
  decklist: Ember.inject.service(),
  mtg: Ember.inject.service(),
  listenToDecklist: Ember.on('init', function() {
    this.get('decklist').on('rawUpdated', this, this.decklistToQueryParams);
  }),
  listenToDeck: Ember.observer('deck', function() {
    this.get('mtg.allSets').then(() => {
      const decoded = decode(this.get('deck'), id => this.get('mtg').nameForMultiverseid(id));
      this.set('decklist.raw', unparse(decoded));
    });
  }),
  decklistToQueryParams() {
    const encoded = encode(this.get('decklist'));
    Ember.Logger.log('ENCODED', encoded);
    this.set('deck', encoded);
  },
  isSidenavOpen: false
});
