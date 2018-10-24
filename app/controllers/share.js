import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';
import { isBlank } from '@ember/utils';

export default Controller.extend({
  decklist: service(),
  application: controller(),
  isInEditView: true,
  determineEditState: on('init', function() {
    if (!isBlank(this.get('application.deck'))) {
      this.set('isInEditView', false);
    }
  })
});
