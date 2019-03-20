import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({
  mtg: service(),
  decklist: service(),
  playtestCards: controller(),
  showBasicLands: true
});
