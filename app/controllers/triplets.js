import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  mtg: service(),

  left: '',
  primary: '',
  right: '',

  actions: {
    swap() {
      const left = this.get('left');
      const right = this.get('right');
      this.set('left', right);
      this.set('right', left);
    }
  }
});
