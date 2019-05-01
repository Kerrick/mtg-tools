import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import { computed, set } from '@ember/object';
import Controller, { inject as controller } from '@ember/controller';
import { isBlank } from '@ember/utils';

export default Controller.extend({
  decklist: service(),
  application: controller(),
  _isInEditView: undefined,
  isInEditView: computed('_isInEditView', {
    get() {
      return this._isInEditView === undefined ? !this.application.deck : this._isInEditView;
    },
    set(key, value) {
      set(this, '_isInEditView', value);
      return value;
    }
  }),
  determineEditState: on('init', function() {
    if (!isBlank(this.get('application.deck'))) {
      this.set('isInEditView', false);
    }
  })
});
