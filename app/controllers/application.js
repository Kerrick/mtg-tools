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
  deckFromUrl: Ember.on('init', function() {
    // We're only doing this on page load because it's only useful when linked to
    this.get('mtg.allSets').then(() => {
      const decoded = decode(this.get('deck'), id => this.get('mtg').nameForMultiverseid(id));
      this.set('decklist.raw', unparse(decoded));
    });
  }),
  decklistToQueryParams() {
    this.set('deck', encode(this.get('decklist')));
  },
  isSidenavOpen: false
});
