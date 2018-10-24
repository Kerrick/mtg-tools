import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({
  mtg: service(),
  decklist: service(),
  playtestCards: controller(),
  showBasicLands: true,
  /**
   * Array of Objects with properties card (the card object), and text (the
   * user-input for manually fixing the text layout for print).
   */
  manualTextFixes: [],
  /**
   * Array of Objects withp properties card (the card object), and printing (the
   * user-selected printing object).
   */
  printingSelections: [],
  override(card, value, storageKey, valueKey) {
      const storedValues = this.get(storageKey);
      const override = storedValues.findBy('card', card);
      if (override) {
        set(override, valueKey, value);
      }
      else {
        const obj = { card };
        obj[valueKey] = value;
        storedValues.addObject(obj);
      }
  },
  actions: {
    textEdited(card, event) {
      this.override(card, event.target.innerText, 'manualTextFixes', 'text');
      // TODO: Restore cursor position. Hard to do with contenteditable.
    },
    printingChosen(card, event) {
      const setCode = event.target.options[event.target.selectedIndex].value;
      const printing = get(card, 'printings').findBy('set.code', setCode);
      this.override(card, printing, 'printingSelections', 'printing');
    }
  }
});
