import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  decklist: service(),
  activate() {
    if (
      isBlank(
        this.controllerFor(
          'application'
        ).get('deck')
      )
    ) {
      this.replaceWith(
        'playtest-cards.index'
      );
    }
  }
});
