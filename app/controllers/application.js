import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { encode, decode } from 'mtg-tools/utils/deck-encoder';
import { unparse } from 'mtg-tools/utils/deck-parser';

export default Controller.extend({
  queryParams: ['deck'],
  deck: '',
  decklist: service(),
  mtg: service(),
  listenToDecklist: on('init', function() {
    this.get('decklist').on('rawUpdated', this, this.decklistToQueryParams);
  }),
  deckFromUrl: on('init', function() {
    // We're only doing this on page load because it's only useful when linked to
    this.get('mtg.allPrintings').then(() => {
      const decoded = decode(this.get('deck'), id => this.get('mtg').nameFormultiverseId(id));
      this.set('decklist.raw', unparse(decoded));
    });
  }),
  decklistToQueryParams() {
    this.set('deck', encode(this.get('decklist')));
  },
  isSidenavOpen: false
});
