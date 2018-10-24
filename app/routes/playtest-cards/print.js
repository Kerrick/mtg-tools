import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  decklist: service(),
  activate() {
    // This page is pretty useless if they haven't given us a decklist.
    if (isBlank(this.get('decklist.raw'))) {
      this.replaceWith('playtest-cards.index');
    }
  }
});
