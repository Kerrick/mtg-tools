import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({
  mtg: service(),
  application: controller(),
  isInPrintView: equal('application.currentRouteName', 'playtest-cards.print'),
  actions: {
    print() {
      window.print();
    }
  }
});
