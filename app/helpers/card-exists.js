import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  mtg: service(),

  compute([cardName = '']) {
    return this.get('mtg').cardsNamed(cardName).length > 0;
  }
});
