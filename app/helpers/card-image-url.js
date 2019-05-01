import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';

export default Helper.extend({
  userPreference: service(),

  compute([cardName], { version = 'large' }) {
    const setCode = this.userPreference.preferredPrintingFor(cardName).set.code.toLowerCase();
    const number = this.userPreference.preferredPrintingFor(cardName).number;
    return `https://api.scryfall.com/cards/${setCode}/${number}/?format=image&version=${version}`;
  },

  onNewPreferredPrinting: observer('userPreference.cardPrintings.[]', function() {
    this.recompute();
  })
});