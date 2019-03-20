import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { preferredPrinting } from '../services/mtg';

export default Component.extend({
  tagName: '',
  userPreference: service(),
  mtg: service(),
  printings: computed(
    'name',
    function() {
      return this.get('mtg')
        .cardsNamed(this.get('name'))
        .sort(preferredPrinting);
    }
  ),
  printing: computed(
    'name',
    'userPreference.cardPrintings.[]',
    function() {
      return this.get(
        'userPreference'
      ).preferredPrintingFor(
        this.get('name')
      );
    }
  ),
  actions: {
    textEdited(event) {
      this.get(
        'userPreference'
      ).preferName(
        this.get('name'),
        event.target.innerText
      );
    },
    printingChosen(event) {
      const setCode =
        event.target.options[
          event.target.selectedIndex
        ].value;
      const printing = this.get(
        'printings'
      ).findBy('set.code', setCode);
      this.get(
        'userPreference'
      ).preferPrinting(
        this.get('name'),
        printing
      );
    }
  }
});
