import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  mtg: service(),
  'show-spinner': true
});
