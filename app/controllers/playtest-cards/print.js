import Ember from 'ember';

const { inject } = Ember;

export default Ember.Controller.extend({
  mtg: inject.service(),
  decklist: inject.service(),
  playtestCards: Ember.inject.controller(),
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
        Ember.set(override, valueKey, value);
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
      const printing = Ember.get(card, 'printings').findBy('set.code', setCode);
      this.override(card, printing, 'printingSelections', 'printing');
    }
  }
});
